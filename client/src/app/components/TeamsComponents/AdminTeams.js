import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

//?API
import { fetchAllTeams } from "../../api/teamAPI";

//?COMPONENTS
import Teams from "./Teams";
import TeamForm from "./TeamForm";

const AdminTeams = ({ type }) => {
  const [teamId, setTeamId] = useState(0);

  return (
    <div>
      {type === 1 ? (
        <div>
          <h5>Admin Teams</h5>
          <div className="bg-light text-dark mb-2">
            <Link to="/teams" className="me-2">
              Team List
            </Link>
            <Link to="/teams/form">Form</Link>
          </div>
          <Switch>
            <Route path="/teams/form">
              <TeamForm teamId={teamId} setTeamId={setTeamId} />
            </Route>
            <Route path="/teams">
              <Teams teamId={teamId} setTeamId={setTeamId} />
            </Route>
          </Switch>
        </div>
      ) : null}
    </div>
  );
};

export default AdminTeams;
