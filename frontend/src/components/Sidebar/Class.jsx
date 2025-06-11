import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Classes.css';

const Classes = () => {
  const [events, setEvents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    from: '',
    to: '',
    status: 'active'
  });

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/classes/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        const formattedEvents = data.map(event => ({
          id: event.id,
          title: event.title,
          start: event.from,
          end: event.to,
          extendedProps: {
            teacher: event.teacher,
            location: event.location,
            status: event.status
          },
          backgroundColor: event.status === 'active' ? '#4f46e5' : '#6b7280',
          borderColor: event.status === 'active' ? '#4338ca' : '#4b5563',
        }));
        setEvents(formattedEvents);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/classes/store', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          teacher: 'John Smith' // Static teacher name as requested
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setShowAddModal(false);
        setFormData({
          title: '',
          location: '',
          from: '',
          to: '',
          status: 'active'
        });
        fetchEvents(); // Refresh events
      }
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle event click
  const handleEventClick = async (clickInfo) => {
    try {
      const response = await fetch(`/api/classes/${clickInfo.event.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const eventData = await response.json();
        setSelectedEvent(eventData);
        setShowViewModal(true);
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  return (
    <div className="classes-container">
      {/* Header */}
      <div className="classes-header">
        <div className="header-content">
          <h1 className="page-title">Classes</h1>
          <button 
            className="add-class-btn"
            onClick={() => setShowAddModal(true)}
          >
            <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Class
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="calendar-wrapper">
        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
        
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={events}
          eventClick={handleEventClick}
          height="auto"
          eventDisplay="block"
          dayMaxEvents={3}
          moreLinkClick="popover"
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short'
          }}
        />
      </div>

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Add New Class</h2>
              <button 
                className="close-btn"
                onClick={() => setShowAddModal(false)}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label">Class Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter class title"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter location"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Start Date & Time</label>
                  <input
                    type="datetime-local"
                    name="from"
                    value={formData.from}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">End Date & Time</label>
                  <input
                    type="datetime-local"
                    name="to"
                    value={formData.to}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="active">Active</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Teacher</label>
                <input
                  type="text"
                  value="John Smith"
                  className="form-input"
                  disabled
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Class Modal */}
      {showViewModal && selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Class Details</h2>
              <button 
                className="close-btn"
                onClick={() => setShowViewModal(false)}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="event-details">
              <div className="detail-group">
                <h3 className="detail-title">Class Title</h3>
                <p className="detail-value">{selectedEvent.title}</p>
              </div>

              <div className="detail-group">
                <h3 className="detail-title">Teacher</h3>
                <p className="detail-value">{selectedEvent.teacher}</p>
              </div>

              <div className="detail-group">
                <h3 className="detail-title">Location</h3>
                <p className="detail-value">{selectedEvent.location}</p>
              </div>

              <div className="detail-row">
                <div className="detail-group">
                  <h3 className="detail-title">Start Time</h3>
                  <p className="detail-value">
                    {new Date(selectedEvent.from).toLocaleString()}
                  </p>
                </div>

                <div className="detail-group">
                  <h3 className="detail-title">End Time</h3>
                  <p className="detail-value">
                    {new Date(selectedEvent.to).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="detail-group">
                <h3 className="detail-title">Status</h3>
                <span 
                  className={`status-badge ${selectedEvent.status}`}
                >
                  {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="close-modal-btn"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;