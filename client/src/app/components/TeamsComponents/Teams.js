import React, { useState, useEffect } from "react";

//?API
import { fetchAllTeams } from "../../api/teamAPI";

//?COMPONENTS
import Team from "./Team";

const Teams = ({ setTeamId }) => {
  const [teams, setTeams] = useState([]);
  const [isTeamUpdated, setIsTeamUpdated] = useState(0);

  useEffect(() => {
    fetchTeams();
  }, []);
  useEffect(() => {
    if (isTeamUpdated) {
      setIsTeamUpdated(false);
      fetchTeams();
    }
  }, [isTeamUpdated]);
  const fetchTeams = async () => {
    const result = await fetchAllTeams();
    if (result.isSuccess) {
      const data = result.data;
      setTeams(data);
    } else {
      setTeams([]);
    }
  };

  return (
    <div className="row">
      {teams.map((team) => {
        return (
          <Team
            key={team.id}
            setTeamId={setTeamId}
            setisTeamUpdated={setIsTeamUpdated}
            team={team}
          />
        );
      })}
    </div>
  );
};

export default Teams;
