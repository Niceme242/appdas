import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CircularTeamChart.css";

const CircularTeamChart = () => {
  const teams = [
    {
      color: "primary",
      title: "Équipe Cardiologie",
      members: [
        { name: "Dr. Marie Dupont", photo: "https://randomuser.me/api/portraits/women/44.jpg" },
        { name: "Dr. Ahmed Benali", photo: "https://randomuser.me/api/portraits/men/34.jpg" },
      ],
    },
    {
      color: "warning",
      title: "Équipe Pédiatrie",
      members: [
        { name: "Dr. Emma Bernard", photo: "https://randomuser.me/api/portraits/women/29.jpg" },
        { name: "Dr. Lucas Moreau", photo: "https://randomuser.me/api/portraits/men/56.jpg" },
      ],
    },
    {
      color: "danger",
      title: "Équipe Chirurgie",
      members: [
        { name: "Dr. Sophie Martin", photo: "https://randomuser.me/api/portraits/women/22.jpg" },
        { name: "Dr. Thomas Lefèvre", photo: "https://randomuser.me/api/portraits/men/60.jpg" },
      ],
    },
  ];

  return (
    <div className="container text-center py-5 circular-org-chart">
      <h2 className="fw-bold mb-5">
        👩‍⚕️ Organigramme circulaire de l'équipe médicale
      </h2>

      <div className="chart-wrapper position-relative mx-auto">
        {/* Cercle central */}
        <div className="center-member">
          <img
            src="https://randomuser.me/api/portraits/men/11.jpg"
            alt="Dr. John Doe"
            className="center-photo"
          />
          <h5 className="mt-2">Dr. John Doe</h5>
          <p className="text-muted mb-0">Chef de service</p>
        </div>

        {/* Branches autour du centre */}
        {teams.map((team, index) => {
          const angle = (index / teams.length) * 360; // répartition circulaire
          return (
            <div
              key={index}
              className={`team-branch ${team.color}`}
              style={{
                transform: `rotate(${angle}deg) translate(280px) rotate(-${angle}deg)`,
              }}
            >
              <div className="branch-box text-center">
                <h5 className={`fw-bold text-${team.color}`}>{team.title}</h5>
              </div>
              <div className="branch-photos">
                {team.members.map((m, i) => (
                  <div key={i} className="member-item">
                    <img src={m.photo} alt={m.name} className="member-photo" />
                    <small className="d-block mt-1">{m.name}</small>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Décorations cercle secondaire */}
        <div className="decorative-circle"></div>
      </div>
    </div>
  );
};

export default CircularTeamChart;
