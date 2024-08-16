import React, { useState, useEffect } from "react";

function Form() {
  const [counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState("");
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  useEffect(() => {
    fetch("./db.json")
      .then((response) => response.json())
      .then((data) => {
        setCounties(data.counties);
        console.log("Counties fetched:", data.counties);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCountyChange = (event) => {
    const countyName = event.target.value;
    setSelectedCounty(countyName);

    const selectedCountyData = counties.find((county) => county.name === countyName);
    setUniversities(selectedCountyData ? selectedCountyData.universities : []);
    setSelectedUniversity(null);

    console.log("Selected county:", countyName); 
    console.log("Universities for selected county:", selectedCountyData ? selectedCountyData.universities : []);
  };

  const handleUniversityClick = (university) => {
    setSelectedUniversity(university);
    console.log("Selected university:", university); 
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="w-50 p-3 border rounded">
        <select className="option" id="counties" value={selectedCounty} onChange={handleCountyChange}>
          <option value="">Select a county</option>
          {counties.map((county) => (
            <option key={county.name} value={county.name}>
              {county.name}
            </option>
          ))}
        </select>
        
        {selectedCounty && (
          <div>
            <h4>Universities in {selectedCounty}</h4>
            <ul>
              {universities.map((university) => (
                <li key={university.name} onClick={() => handleUniversityClick(university)}>
                  <span style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>
                    {university.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedUniversity && (
          <div>
            <h4>{selectedUniversity.name}</h4>
            <h5>Programmes:</h5>
            <ul>
              {selectedUniversity.programmes.map((programme, index) => (
                <li key={index}>
                  <strong>{programme.name}</strong>: {programme.curriculum}
                </li>
              ))}
            </ul>
            <h5>Facilities:</h5>
            <ul>
              {selectedUniversity.facilities.map((facility, index) => (
                <li key={index}>
                  <strong>{facility.name}</strong>: {facility.description}
                </li>
              ))}
            </ul>
            <h5>Lecturers:</h5>
            <ul>
              {selectedUniversity.lecturers.map((lecturer, index) => (
                <li key={index}>
                  <strong>{lecturer.name}</strong>: {lecturer.profile}
                </li>
              ))}
            </ul>
            <h5>Gallery:</h5>
            <ul>
              {selectedUniversity.gallery.map((item, index) => (
                <li key={index}>
                  <img src={item.imageUrl} alt={item.description} style={{ width: "100%" }} />
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
