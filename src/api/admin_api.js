import { postRequestWithHeader, putRequest, getRequestWithHeaders, putRequestWithHeader } from "./util";

class AdminService {
  getAllLabs() {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    return getRequestWithHeaders("users/admin/get-all-labs", config);
  }

  getLastStudent() {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    return getRequestWithHeaders("users/admin/last-student", config);
  }

  getLastLecturer() {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    return getRequestWithHeaders("users/admin/last-lecture", config);
  }


  getLastOfficeClerk() {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    return getRequestWithHeaders("users/admin/last-officeclerk", config);
  }

  getLastTechnicalOfficer() {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    return getRequestWithHeaders("users/admin/last-technicalofficer", config);
  }



  createStudent(data) {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    return postRequestWithHeader("users/admin/create-student", data, config);
  }
  createLecture(data) {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    return postRequestWithHeader("users/admin/create-lecture", data, config);
  }
  createOfficeClerk(data) {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    return postRequestWithHeader("users/admin/create-officeclerk", data, config);
  }
  createTechnicalOfficer(data) {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    return postRequestWithHeader("users/admin/create-technicalofficer", data, config);
  }
  createLaboratory(data) {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    return postRequestWithHeader("users/admin/create-laboratory", data, config);
  }


  //! new
  getUserData(userEmail) {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    return postRequestWithHeader("users/admin/get-user", userEmail, config);
  }
  updatePassword(userData) {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    return putRequestWithHeader("users/admin/update-user", userData, config);
  }


}

export default new AdminService();

