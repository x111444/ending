const handleUpdateButtonClick = () => {

    const profileData = {
      user_id ,
      animal_name: petName,
      sex: petSex,
      birth: petBirth,
      imgCrop,
    } 
    
    // Send the profile data to the server
    axios
      .post(`http://3.88.1.192:3000/api/diary/animal?user_id=${user_id}`, profileData)
      .then((response) => {
        console.log(response.data);
        onProfileSave(profileData);
        onClose();
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };