import React from "react";
import "../styles/AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About Smart Education Events System (SEES)</h1>
        <p className="subtitle">
          Revolutionizing the way educational events are discovered, managed, and experienced.
        </p>
      </div>

      <section className="about-section">
        <h2>What is SEES?</h2>
        <p>
          SEES is a comprehensive platform designed to simplify educational event engagement for all stakeholders —
          <strong> Attendees</strong>, <strong>Organizers</strong>, and <strong>Admins</strong>. Whether you're looking
          to attend insightful workshops or manage a large-scale academic conference, SEES offers an all-in-one solution
          to handle event discovery, analytics, resources, networking, and more.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          We believe education should be accessible, collaborative, and inspiring. Our mission is to empower both learners
          and event hosts with tools that enhance the overall event experience — from seamless registration and personalized
          profiles to interactive networking and resource sharing.
        </p>
      </section>

      <section className="about-section">
        <h2>Why SEES?</h2>
        <ul>
          <li>✔️ Role-based experiences (Attendee, Organizer, Admin)</li>
          <li>✔️ Dynamic event listing & registration system</li>
          <li>✔️ Organizer dashboards with analytics & reporting</li>
          <li>✔️ Resource sharing, feedback collection, and more</li>
          <li>✔️ Clean, responsive, and modern design</li>
        </ul>
      </section>

      <section className="about-section team-section">
        <h2>Meet Our Team</h2>
        <div className="team-cards">
          <div className="team-card">
            <img src="https://via.placeholder.com/150" alt="Maria-Christine Catiche" />
            <h4>Maria-Christine Catiche</h4>
            <p>Scrum Master</p>
          </div>
          <div className="team-card">
            <img src="https://via.placeholder.com/150" alt="Parsa Darbani" />
            <h4>Parsa Darbani</h4>
            <p>Project Manager</p>
          </div>
          <div className="team-card">
            <img src="https://via.placeholder.com/150" alt="Arman Emami" />
            <h4>Arman Emami</h4>
            <p>Team Leader</p>
          </div>
          <div className="team-card">
            <img src="https://via.placeholder.com/150" alt="Parsa Hejazi" />
            <h4>Parsa Hejazi</h4>
            <p>Frontend Developer</p>
          </div>
          <div className="team-card">
            <img src="https://via.placeholder.com/150" alt="Ayman Mehdi" />
            <h4>Ayman Mehdi</h4>
            <p>Data Modeler</p>
          </div>
          <div className="team-card">
            <img src="https://via.placeholder.com/150" alt="Teodor Oprea" />
            <h4>Teodor Oprea</h4>
            <p>Backend Developer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;