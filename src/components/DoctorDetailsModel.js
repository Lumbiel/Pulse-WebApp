import React, { useState, useEffect } from 'react';
import styles from './DoctorDetailsModel.module.scss'; // Correct file name!
import { db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

function DoctorDetailsModal({ onClose, editingDoctor }) {
  const [name, setName] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [timeOfService, setTimeOfService] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editingDoctor) {
      setName(editingDoctor.name);
      setSpeciality(editingDoctor.speciality);
      setTimeOfService(editingDoctor.timeOfService);
      setAddress(editingDoctor.address);
      setContact(editingDoctor.contact);
      setEmail(editingDoctor.email);
    } else {
      setName('');
      setSpeciality('');
      setTimeOfService('');
      setAddress('');
      setContact('');
      setEmail('');
    }
  }, [editingDoctor]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctorData = {
      name: name,
      speciality: speciality,
      timeOfService: timeOfService,
      address: address,
      contact: contact,
      email: email,
    };

    try {
      if (editingDoctor && editingDoctor.id) {
        await updateDoc(doc(db, "doctors", editingDoctor.id), doctorData);
        console.log("Doctor updated successfully with ID: ", editingDoctor.id);
      } else {
        const docRef = await addDoc(collection(db, "doctors"), doctorData);
        console.log("Doctor added successfully with ID: ", docRef.id);
      }
      onClose();
    } catch (error) {
      console.error("Error saving doctor: ", error);
      // Handle error
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{editingDoctor ? 'Edit Doctor Details' : 'Add Doctor Details'}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="speciality">Speciality:</label>
            <input
              type="text"
              id="speciality"
              name="speciality"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="timeOfService">Time of service:</label>
            <input
              type="text"
              id="timeOfService"
              name="timeOfService"
              value={timeOfService}
              onChange={(e) => setTimeOfService(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="contact">Contact:</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.buttons}>
            <button type="submit">{editingDoctor ? 'Update' : 'Save'}</button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DoctorDetailsModal;