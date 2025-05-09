import React, { useState, useEffect, useCallback } from 'react';
import styles from './AdminDoctorManagement.module.scss'; // Correct file name!
import DoctorDetailsModal from '../components/DoctorDetailsModel'; // Correct file name!
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function AdminDoctorManagement() {
  const [doctorCount, setDoctorCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [editingDoctor, setEditingDoctor] = useState(null);
  const navigate = useNavigate();

  const openModal = () => {
    setEditingDoctor(null); // Reset editing doctor
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchDoctors = useCallback(async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "doctors"));
      const doctorsData = [];
      querySnapshot.forEach((doc) => {
        doctorsData.push({ id: doc.id, ...doc.data() });
      });
      setDoctorCount(querySnapshot.size); 
      setDoctors(doctorsData);
      
    } catch (error) {
      console.error("Error fetching doctors: ", error);
    } finally {
      setIsLoading(false); // Set isLoading to false after fetching
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('Logout successful');
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const openEditModal = (doctor) => {
    setEditingDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleDeleteDoctor = async (id) => {
    try {
      await deleteDoc(doc(db, "doctors", id));
      console.log("Doctor deleted successfully with ID: ", id);
      fetchDoctors(); // Refresh the table
    } catch (error) {
      console.error("Error deleting doctor: ", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>ALL REGISTERED DOCTORS</h1>
        <div className={styles.profileSection}>
          <div className={styles.profileIcon}></div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      <div className={styles.content}>
      <div className={styles.statsWidget}>
        <h3>Total Doctors Registered</h3>
        <p>{isLoading ? 'Loading...' : doctorCount}</p>
      </div>
        <div className={styles.buttonContainer}>
          <button onClick={openModal} className={styles.addDoctorButton}>
            Add Doctor
          </button>
          <button onClick={fetchDoctors} className={styles.refreshButton}>
            Refresh Doctors
          </button>
        </div>

        {isModalOpen && (
          <div className={styles.modalContainer}>
            <DoctorDetailsModal onClose={closeModal} editingDoctor={editingDoctor} />
          </div>
        )}

        <div className={styles.tableContainer}>
          <table className={styles.doctorTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Speciality</th>
                <th>Time of service</th>
                <th>Address</th>
                <th>Contacts</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.name}</td>
                  <td>{doctor.speciality}</td>
                  <td>{doctor.timeOfService}</td>
                  <td>{doctor.address}</td>
                  <td>{doctor.contact}</td>
                  <td>
                    <button onClick={() => openEditModal(doctor)}>Edit</button>
                    <button onClick={() => handleDeleteDoctor(doctor.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDoctorManagement;