import { useState, useEffect } from 'react';
import 'normalize.css';
import styles from '../styles/TuitionPosts.module.css'
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth(); // Months are zero-based
  const year = date.getFullYear();

  const monthsAbbrev = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL',
    'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  const formattedDate = `${day} ${monthsAbbrev[month]} ${year}`;
  return formattedDate;
}

function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDateandTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Modify the format as needed
}



const imageStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  objectFit: "cover",
};

function TuitionPosts({ tutorid }) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  //const [searchTerm, setSearchTerm] = useState('');
  // const [appliedPosts, setAppliedPosts] = useState([]); 
  const [filterOptions, setFilterOptions] = useState({
    minSalary: '',
    tuition_type: '',
    availability: 'available',
    gender: '',
    subject: '',
  });

  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');



  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  // useEffect(() => {
  //   filterPosts();
  // }, [ posts, filterOptions]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/allposts?tutorId=${tutorid}`);
      const data = await response.json();

      // const appliedResponse = await fetch(`/api/appliedposts?tutorId=${tutorid}`);
      // const appliedData = await appliedResponse.json();
      // console.log(appliedData);
      setPosts(data);
      // setAppliedPosts(appliedData );
      // console.log("data",posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {

    setFilteredPosts(posts);

    let filtered = [...posts];

    if (sortBy === 'salary') {
      filtered.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.SALARY - b.SALARY;
        } else {
          return b.SALARY - a.SALARY;
        }
      });
    } else if (sortBy === 'date') {
      filtered.sort((a, b) => {
        const dateA = new Date(a.TIMESTAMP);
        const dateB = new Date(b.TIMESTAMP);

        if (sortOrder === 'asc') {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });
    }

    if (filterOptions.minSalary) {
      filtered = filtered.filter(
        (tuition) =>
          tuition.SALARY >= parseInt(filterOptions.minSalary)
      );
    }

    if (filterOptions.tuition_type) {
      filtered = filtered.filter(
        (tuition) =>
          tuition.TUITION_TYPE.toLowerCase() ===
          filterOptions.tuition_type.toLowerCase()
      );
    }

    if (filterOptions.availability) {
      filtered = filtered.filter(
        (tuition) =>
          tuition.STATUS.toLowerCase() ===
          filterOptions.availability.toLowerCase()
      );
    }

    if (filterOptions.gender) {
      filtered = filtered.filter(
        (tuition) =>
          tuition.GENDER.toLowerCase() ===
          filterOptions.gender.toLowerCase()
      );
    }

    if (filterOptions.subject) {
      const subjectFilter = filterOptions.subject.toLowerCase();
      filtered = filtered.filter((tuition) =>
        tuition.SUBJECTS && tuition.SUBJECTS.toLowerCase().includes(subjectFilter)
      );
    }





    // filtered = filtered.map((tuition) => ({
    //   ...tuition,
    //   applied: appliedPosts.some(appliedPost => appliedPost.POST_ID === tuition.POST_ID)
    // }));

    setFilteredPosts(filtered);
  }, [posts, filterOptions, sortBy, sortOrder]);




  const handleFilterChange = (filter, value) => {
    let newValue = value;

    if (filter === "minSalary") {
      newValue = Math.max(0, parseInt(value));
    }

    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [filter]: newValue,
    }));
  };

  const handlePostClick = (tuition) => {
    setSelectedPost(tuition);
  };

  const handleApply = async (tuition) => {
    // setSelectedPost(tuition);
    const tutorId = parseInt(tutorid);
    const postId = tuition.POST_ID;
    console.log("selectedpostID -- ", postId);

    try {
      const response = await fetch("/api/tutorapply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tutorId, postId }),
      });

      const data = await response.json();

      const updatedFilteredPosts = filteredPosts.filter(
        (post) => post.POST_ID !== tuition.POST_ID
      );

      setFilteredPosts(updatedFilteredPosts);


      // console.log(data);
    } catch (error) {
      console.error("Error applying:", error);
    }
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Function to toggle the filter section
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };


  const [offerSubmitted, setOfferSubmitted] = useState(false);






  
  return (
    <div className={styles.tuitionpostscontainer}>

      <div className={styles.filterwrapper}>

        <div className={`${styles.filtercontainer} ${isFilterOpen ? styles.open : styles.closed}`}>

          <div className={styles.filterdetails}>

            <h2>Filter</h2>

            {/* Minimum Salary */}
            <div className={`${styles.filtername} ${styles.fieldcontainer1}`}>
              <label>Minimum Salary:</label>
            </div>
            <div className={`${styles.filtervalues} ${styles.fieldcontainer1}`}>
              <input
                className={styles.filterinput}
                type="number"
                value={filterOptions.minSalary}
                onChange={(e) => handleFilterChange('minSalary', e.target.value)}
              />
            </div>

            {/* Tuition Type */}
            <div className={`${styles.filtername} ${styles.fieldcontainer1}`}>
              <label>Tuition Type:</label>
            </div>
            <div className={`${styles.filtervalues} ${styles.fieldcontainer1}`}>
              <select
                value={filterOptions.tuition_type}
                onChange={(e) =>
                  handleFilterChange('tuition_type', e.target.value)
                }
              >
                <option value="">All</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            {/* Preferred Gender */}
            <div className={`${styles.filtername} ${styles.fieldcontainer1}`}>
              <label>Preferred Gender:</label>
            </div>
            <div className={`${styles.filtervalues} ${styles.fieldcontainer1}`}>
              <select
                value={filterOptions.gender}
                onChange={(e) =>
                  handleFilterChange('gender', e.target.value)
                }
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Subjects */}
            <div className={`${styles.filtername} ${styles.fieldcontainer1}`}>
              <label>Subjects:</label>
            </div>
            <div className={`${styles.filtervalues} ${styles.fieldcontainer1}`}>
              <input
                className={styles.filterinput}
                type="text"
                value={filterOptions.subject}
                onChange={(e) => handleFilterChange('subject', e.target.value)}
              />
            </div>

            <h2>Sort By</h2>

            {/* Sort By */}
            <div className={`${styles.filtername} ${styles.fieldcontainer1}`}>
              <label>Sort By:</label>
            </div>
            <div className={`${styles.filtervalues} ${styles.fieldcontainer1}`}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">None</option>
                <option value="salary">Salary</option>
                <option value="date">Posted Date</option>
              </select>
            </div>

            {sortBy && (

              <div className={styles.sortorder}>

                <label>Sort Order:</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>

            )}


          </div>

      

        </div>

        <div className={styles.filterhandle} onClick={toggleFilter}><FontAwesomeIcon icon={faSliders} /></div>

      </div>



      <div className={styles.postscontainer} >

        <div>

          <h2>Posts</h2>

          <div className={styles.tuitionpostslist} >
            {filteredPosts.map((tuition) => (

              <div
                className={styles.postbox}
                key={tuition.POST_ID}
                onClick={() => handlePostClick(tuition)}
              >
                {/* <p> {tuition.TUITION_TYPE}</p> */}


                <div className={styles.tuitionimgcontainer}>
                  <img src={tuition.IMAGE} className={styles.tuitionimg} alt="Student Image" />
                </div>

                <div className={styles.tuitiondetails} >
                  <p className={styles.Name}>{cap(tuition.NAME)}  </p>
                  <p className={styles.Class}> {cap(tuition.CLASS)} &nbsp;||&nbsp; {cap(tuition.INSTITUTION)}</p>

                  {/* <p> Subjects: {cap(tuition.SUBJECTS)}</p> */}

                  {/* If subject isn't blank, it will print the subjects. Other wise, it'll print not specified */}



                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Tuition Mode: </p>
                    <p className={styles.fieldvalue}><span className={styles.Type}>{cap(tuition.TUITION_TYPE)} </span></p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Subjects:</p>
                    <p className={styles.fieldvalue}>{tuition.SUBJECTS ? cap(tuition.SUBJECTS) : 'Not Specified'}</p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Renumeration :</p>
                    <p className={styles.fieldvalue}>{tuition.SALARY}</p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Preferred Gender:</p>
                    <p className={styles.fieldvalue}>{tuition.TUTOR_GENDER}</p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}>  Location:</p>
                    <p className={styles.fieldvalue}>{cap(tuition.ROAD)},&nbsp;{cap(tuition.AREA)},&nbsp;{cap(tuition.CITY)}</p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}>  POSTED ON</p>
                    <p className={styles.fieldvalue}><span className={styles.Date}>{formatDateandTime(tuition.TIMESTAMP)}</span></p>
                  </div>




                  {/* 
                <p className={styles.Type}> {cap(tuition.TUITION_TYPE)}</p>
                <p className={styles.Subjects}> Subjects: <span>{tuition.SUBJECTS ? cap(tuition.SUBJECTS) : 'Not Specified'}</span></p>
                <p className={styles.Renu}> Renumeration : <span>Tk&nbsp;{tuition.SALARY}</span></p>
                <p className={styles.Gender}> Preferred Gender: <span>{tuition.TUTOR_GENDER}</span></p>
                <p className={styles.Location}> Location: <span>{cap(tuition.ROAD)},&nbsp;{cap(tuition.AREA)},&nbsp;{cap(tuition.CITY)}</span></p>
                {tuition.NOTE ? <p> Note: <span>{cap(tuition.NOTE)}</span></p> : null}
                <p className={styles.Date}>  POSTED ON <span>{formatDateandTime(tuition.TIMESTAMP)}</span></p> */}

                  <button className={styles.tuitionpostbtn} onClick={() => handleApply(tuition)}>Apply</button>

                </div>



              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
}

export default TuitionPosts;
