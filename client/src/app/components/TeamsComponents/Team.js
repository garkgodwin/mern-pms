import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//?API
import { fetchMembersByTeamId, deleteTeam } from "../../api/teamAPI";
import { fetchProjectsByTeamId } from "../../api/projectAPI";

//?COMPONENTS
import Member from "./Member";
import MemberForm from "./MemberForm";
import Project from "./Project";

//?sweet alert
import swal from "sweetalert";

const Team = ({ setTeamId, setIsTeamUpdated, team }) => {
  const SYSTEM_MESSAGE = "System Message";
  const history = useHistory();
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [isMemberUpdated, setIsMemberUpdated] = useState(false);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);

  const teamId = team.id;
  useEffect(() => {
    fetchMembers();
    fetchProjects();
  }, []);
  useEffect(() => {
    if (isMemberUpdated) {
      setIsMemberUpdated(false);
      fetchMembers();
      fetchProjects();
    }
  }, [isMemberUpdated]);

  const fetchMembers = async () => {
    const result = await fetchMembersByTeamId(teamId);
    if (result.isSuccess) {
      setMembers(result.data);
    }
  };
  const fetchProjects = async () => {
    const result = await fetchProjectsByTeamId(teamId);
    if (result.isSuccess) {
      setProjects(result.data);
    }
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    setTeamId(team.id);
    history.push("/teams/form");
  };
  const handleRemoveClick = async (e) => {
    e.preventDefault();
    const result = deleteTeam(team.id);
    if (result.isSuccess) {
      swal({
        title: SYSTEM_MESSAGE,
        text: result.message,
        icon: "success",
        button: "Ok",
      }).then((value) => {
        setIsTeamUpdated(true);
      });
    } else {
      swal({
        title: SYSTEM_MESSAGE,
        text: result.message,
        icon: result.isError
          ? "error"
          : result.isInvalid
          ? "warning"
          : result.isFailure
          ? "info"
          : "info",
        button: "Ok",
      });
    }
  };

  const handleAddMemberClick = async (e) => {
    e.preventDefault();
    setShowMemberForm(true);
  };
  return (
    <div className="col-12 card shadow mb-1 d-flex flex-column p-3">
      <h1>{team.teamName}</h1>
      <small>
        {team.description === ""
          ? "No descrion available for this team."
          : team.description}
      </small>
      <hr />

      <div className="d-flex flex-column justify-content-center align-items-center">
        <small>Members</small>
        {members.length === 0 && <small>No Members for this team.</small>}
        {members.length !== 0 && (
          <div className="row">
            {members.map((member) => {
              return (
                <Member
                  key={member.id}
                  member={member}
                  setIsMemberUpdated={setIsMemberUpdated}
                />
              );
            })}
          </div>
        )}
        <button
          className="mt-1 btn btn-primary w-25"
          onClick={(e) => handleAddMemberClick(e)}
        >
          Add Member
        </button>
        <div className="w-100 d-flex justify-content-center mt-1">
          {showMemberForm && (
            <MemberForm
              teamId={teamId}
              setShowMemberForm={setShowMemberForm}
              setIsMemberUpdated={setIsMemberUpdated}
            />
          )}
        </div>
      </div>
      <hr />

      <div className="d-flex flex-column justify-content-center align-items-center">
        <small>Projects</small>
        {projects.length === 0 ? (
          <small>No Projects added to this team.</small>
        ) : (
          <div className="row">
            {projects.map((project) => {
              return <Project key={project.id} project={project} />;
            })}
          </div>
        )}
      </div>
      <hr />

      <div className="d-flex flex-row mt-2">
        <button
          className="btn btn-primary "
          onClick={(e) => {
            handleUpdateClick(e);
          }}
        >
          Update
        </button>
        <button
          className="btn btn-danger "
          onClick={(e) => {
            handleRemoveClick(e);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Team;
