import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://nexifytw.mynetgear.com:45000/api/Record';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  records: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Name is required'),
      dateOfBirth: Yup.date().required('Date of Birth is required'),
      salary: Yup.number()
        .min(0, 'Salary must be at least 0')
        .max(100000, 'Salary must not exceed 100000'),
      address: Yup.string().required('Address is required'),
    })
  ),
});

const EmployeeManagement = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: {
      records: [],
    },
    resolver: yupResolver(validationSchema),
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'records',
  });

  const [loading, setLoading] = useState(false);

  const watchedFields = watch('records');

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/GetRecords`);
      if (response.data.success) {
        const formattedData = response.data.data.map((record) => ({
          name: record.name,
          dateOfBirth: record.dateOfBirth.split('T')[0],
          salary: record.salary,
          address: record.address,
        }));
        reset({ records: formattedData });
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveRecords = async (data) => {
    setLoading(true);
    try {
      const formattedData = data.records.map((record) => ({
        Name: record.name,
        DateOfBirth: record.dateOfBirth,
        Salary: Number(record.salary),
        Address: record.address,
      }));

      const response = await axios.post(`${API_BASE_URL}/SaveRecords`, formattedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        fetchRecords(); // Refresh data after saving
      }
    } catch (error) {
      console.error('Error saving records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await fetchRecords(); // Fetch updated data from API
    } catch (error) {
      console.error('Error updating records:', error);
    }
  };

  const handleAdd = () => {
    append({
      name: '',
      dateOfBirth: '',
      salary: 50000,
      address: '',
    });
  };

  // Aggregate general error messages for the banner
  const errorBanner = isSubmitted && errors.records
    ? 'Please correct the highlighted errors in the form before saving.'
    : '';

  return (
    <div className="employee-management">
      <div className="header">
        <h1>Employee Management</h1>
        <div className="button-group">
          <button onClick={handleAdd} disabled={loading} className="btn btn-primary">
            Add
          </button>
          <button onClick={handleSubmit(saveRecords)} disabled={loading} className="btn btn-secondary">
            Save
          </button>
          <button onClick={handleUpdate} disabled={loading} className="btn btn-primary">
            Update
          </button>
        </div>
      </div>

      <div className="content">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <div className="table-container">
            {errorBanner && (
              <div className="error-banner">
                {errorBanner}
              </div>
            )}
            <form>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Birthday</th>
                    <th>Salary</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => (
                    <tr key={field.id}>
                      <td>
                        <input
                          {...control.register(`records.${index}.name`)}
                          type="text"
                          placeholder="Name"
                          className={`text-input ${errors.records?.[index]?.name ? 'error-outline' : ''}`}
                        />
                      </td>
                      <td>
                        <input
                          {...control.register(`records.${index}.dateOfBirth`)}
                          type="date"
                          className={`date-input ${errors.records?.[index]?.dateOfBirth ? 'error-outline' : ''}`}
                        />
                      </td>
                      <td>
                        <div className="salary-input">
                          <input
                            {...control.register(`records.${index}.salary`)}
                            type="range"
                            min="0"
                            max="100000"
                            className={errors.records?.[index]?.salary ? 'error-outline' : ''}
                          />
                          <span className="salary-value">
                            {formatCurrency(watchedFields?.[index]?.salary || 0)}
                          </span>
                        </div>
                      </td>
                      <td>
                        <input
                          {...control.register(`records.${index}.address`)}
                          type="text"
                          placeholder="Address"
                          className={`text-input ${errors.records?.[index]?.address ? 'error-outline' : ''}`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeManagement;
