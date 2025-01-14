import React, { useState, useEffect } from 'react'
import './App.css'

const API_BASE_URL = 'http://nexifytw.mynetgear.com:45000/api/Record'

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

const EmployeeManagement = () => {
  const [records, setRecords] = useState([])
  const [newRecord, setNewRecord] = useState({
    name: '',
    dateOfBirth: '',
    salary: 50000,
    address: '',
  })
  const [loading, setLoading] = useState(false)
  const [showNewRecord, setShowNewRecord] = useState(false)

  const fetchRecords = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/GetRecords`)
      const data = await response.json()
      if (data.success) {
        setRecords(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching records:', error)
    }
    setLoading(false)
  }

  console.log('records', records)

  const handleAdd = () => {
    setShowNewRecord(true)
    setNewRecord({ name: '', dateOfBirth: '', salary: 50000, address: '' })
  }

  const handleSave = async () => {
    try {
      const recordsToSave = showNewRecord ? [...records, newRecord] : records
      const response = await fetch(`${API_BASE_URL}/SaveRecords`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          recordsToSave.map((record) => ({
            Name: record.name,
            DateOfBirth: record.dateOfBirth,
            Salary: Number(record.salary),
            Address: record.address,
          }))
        ),
      })
      const result = await response.json()
      if (result.success) {
        fetchRecords()
        setShowNewRecord(false)
      }
    } catch (error) {
      console.error('Error saving records:', error)
    }
  }

  const handleInputChange = (e, index, field) => {
    if (index === -1) {
      setNewRecord({ ...newRecord, [field]: e.target.value })
    } else {
      const updatedRecords = [...records]
      updatedRecords[index] = {
        ...updatedRecords[index],
        [field]: e.target.value,
      }
      setRecords(updatedRecords)
    }
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  return (
    <div className='employee-management'>
      <div className='header'>
        <h1>Employee Management</h1>
        <div className='button-group'>
          <button
            onClick={handleAdd}
            disabled={loading}
            className='btn btn-primary'
          >
            Add Employee
          </button>
          <button
            onClick={fetchRecords}
            disabled={loading}
            className='btn btn-secondary'
          >
            Refresh
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className='btn btn-primary'
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className='content'>
        {loading ? (
          <div className='loading'>
            <div className='spinner'></div>
            <p>Loading...</p>
          </div>
        ) : (
          <div className='table-container'>
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
                {records.map((record, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type='text'
                        value={record.name}
                        onChange={(e) => handleInputChange(e, index, 'name')}
                        className='text-input'
                      />
                    </td>
                    <td>
                      <input
                        type='date'
                        value={record.dateOfBirth?.split('T')[0]}
                        onChange={(e) =>
                          handleInputChange(e, index, 'dateOfBirth')
                        }
                        className='date-input'
                      />
                    </td>
                    <td>
                      <div className='salary-input'>
                        <input
                          type='range'
                          min='0'
                          max='100000'
                          value={record.salary}
                          onChange={(e) =>
                            handleInputChange(e, index, 'salary')
                          }
                        />
                        <span className='salary-value'>
                          {formatCurrency(record.salary)}
                        </span>
                      </div>
                    </td>
                    <td>
                      <input
                        type='text'
                        value={record.address}
                        onChange={(e) => handleInputChange(e, index, 'address')}
                        className='text-input'
                      />
                    </td>
                  </tr>
                ))}
                {showNewRecord && (
                  <tr className='new-record'>
                    <td>
                      <input
                        type='text'
                        placeholder='Employee Name'
                        value={newRecord.name}
                        onChange={(e) => handleInputChange(e, -1, 'name')}
                        className='text-input'
                      />
                    </td>
                    <td>
                      <input
                        type='date'
                        value={newRecord.dateOfBirth}
                        onChange={(e) =>
                          handleInputChange(e, -1, 'dateOfBirth')
                        }
                        className='date-input'
                      />
                    </td>
                    <td>
                      <div className='salary-input'>
                        <input
                          type='range'
                          min='0'
                          max='100000'
                          value={newRecord.salary}
                          onChange={(e) => handleInputChange(e, -1, 'salary')}
                        />
                        <span className='salary-value'>
                          {formatCurrency(newRecord.salary)}
                        </span>
                      </div>
                    </td>
                    <td>
                      <input
                        type='text'
                        placeholder='Address'
                        value={newRecord.address}
                        onChange={(e) => handleInputChange(e, -1, 'address')}
                        className='text-input'
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployeeManagement
