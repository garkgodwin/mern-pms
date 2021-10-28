const db = require("./models");
const Account = db.accounts;
const Project = db.projects;
const Task = db.tasks;
const Team = db.teams;
const TeamMember = db.teamMembers;

//?-------------------------------------------------CREATE ADMIN
exports.createAdmin = async () => {
  let result = false;
  const type = 1;
  const username = "admin";
  const email = "ggadmin@gmail.com";
  const password = "passAdmin";
  const firstName = "Kupido";
  const lastName = "Puso";
  const sex = 1;
  const title = "MIT";
  const specialization = "Project Administrator";
  const status = 0;
  const activated = true;
  const otp = "";
  const otpSent = true;
  await Account.create({
    type: type,
    username: username,
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    sex: sex,
    title: title,
    specialization: specialization,
    status: status,
    activated: activated,
    otp: otp,
    otpSent: otpSent,
  })
    .then((response) => {
      const options = response._options;
      const isNewRecord = options.isNewRecord;
      if (isNewRecord) {
        result = true;
      } else {
        result = false;
      }
    })
    .catch((error) => {
      const name = error.name;
      if (name) {
        if (name === "SequelizeValidationError") {
          console.log(name);
        } else if (name === "SequelizeUniqueConstraintError") {
          console.log("Admin already created..");
        } else {
          console.log(name);
        }
      } else {
        console.log(error.message);
      }
      result = false;
    });
  return result;
};

//?ACCOUNTS
exports.createDefaults = async () => {
  console.log("================Creating defaults....");
  const employee1Created = await createEmployee1();
  if (employee1Created) {
    console.log("CREATE : Employee 1 created.");
    const employee2Created = await createEmployee2();
    if (employee2Created) {
      console.log("CREATE : Employee 2 created.");
      const client1Created = await createClient1();
      if (client1Created) {
        console.log("CREATE : Client created.");
        const teamCreated = await createTeam();
        if (teamCreated) {
          console.log("CREATE : Team created.");
          const member1Added = await addTeamMember1();
          if (member1Added) {
            console.log("CREATE : Member 1 created.");
            const member2Added = await addTeamMember2();
            if (member2Added) {
              console.log("CREATE : Member 2 created.");
              const ownedProjectCreated = await createOwnedProject();
              const notOwnedProjectCreated = await createNotOwnedProject();
              if (ownedProjectCreated) {
                console.log("CREATE : Project 1 created.");
              } else {
                console.log("FAILED: Project 1 creation failed.");
              }
              if (notOwnedProjectCreated) {
                console.log("CREATE : Project 2 created.");
              }
            }
          }
        }
      }
    }
  }
};
const createEmployee1 = async () => {
  const type = 2;
  const username = "employee1";
  const email = "employee1@gmail.com";
  const password = "passEmployee1";
  const firstName = "James";
  const lastName = "Bond";
  const sex = 1;
  const title = "MIT";
  const specialization = "Web Developer";
  const status = 0;
  const activated = true;
  const otp = "";
  const otpSent = true;
  await Account.create({
    type: type,
    username: username,
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    sex: sex,
    title: title,
    specialization: specialization,
    status: status,
    activated: activated,
    otp: otp,
    otpSent: otpSent,
  })
    .then((response) => {
      const options = response._options;
      const isNewRecord = options.isNewRecord;
      if (isNewRecord) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      const name = error.name;
      if (name) {
        if (name === "SequelizeValidationError") {
          console.log(name);
        } else if (name === "SequelizeUniqueConstraintError") {
          console.log("Employee is already created..");
        } else {
          console.log(name);
        }
      } else {
        console.log(error.message);
      }
      return false;
    });
  return true;
};
const createEmployee2 = async () => {
  const type = 2;
  const username = "employee2";
  const email = "employee2@gmail.com";
  const password = "passEmployee2";
  const firstName = "Jane";
  const lastName = "Doe";
  const sex = 0;
  const title = "CSS";
  const specialization = "Data Analyst";
  const status = 0;
  const activated = true;
  const otp = "";
  const otpSent = true;
  await Account.create({
    type: type,
    username: username,
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    sex: sex,
    title: title,
    specialization: specialization,
    status: status,
    activated: activated,
    otp: otp,
    otpSent: otpSent,
  })
    .then((response) => {
      const options = response._options;
      const isNewRecord = options.isNewRecord;
      if (isNewRecord) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      const name = error.name;
      if (name) {
        if (name === "SequelizeValidationError") {
          console.log(name);
        } else if (name === "SequelizeUniqueConstraintError") {
          console.log("Employee is already created..");
        } else {
          console.log(name);
        }
      } else {
        console.log(error.message);
      }
      return false;
    });
  return true;
};
const createClient1 = async () => {
  const type = 3;
  const username = "client1";
  const email = "client1@gmail.com";
  const password = "passClient1";
  const firstName = "John";
  const lastName = "Smith";
  const sex = 0;
  const title = "MB";
  const specialization = "Business Minded";
  const status = 0;
  const activated = true;
  const otp = "";
  const otpSent = true;
  await Account.create({
    type: type,
    username: username,
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    sex: sex,
    title: title,
    specialization: specialization,
    status: status,
    activated: activated,
    otp: otp,
    otpSent: otpSent,
  })
    .then((response) => {
      const options = response._options;
      const isNewRecord = options.isNewRecord;
      if (isNewRecord) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      const name = error.name;
      if (name) {
        if (name === "SequelizeValidationError") {
          console.log(name);
        } else if (name === "SequelizeUniqueConstraintError") {
          console.log("Client is already created..");
        } else {
          console.log(name);
        }
      } else {
        console.log(error.message);
      }
      return false;
    });
  return true;
};

//?TEAM AND TEAM MEMBERS
const createTeam = async () => {
  let result = false;
  const teamName = "Team 1";
  const description = "This is the greatest team ever!";
  await Team.create({
    teamName: teamName,
    description: description,
  })
    .then((response) => {
      if (response._options.isNewRecord) {
        result = true;
      } else {
        result = false;
      }
    })
    .catch((error) => {
      const errors = error.errors;
      if (errors) {
        let message = "";
        for (let i = 0; i < errors.length; i++) {
          const validatorKey = errors[i].validatorKey;
          const path = errors[i].path;
          const sub =
            validatorKey === "len"
              ? "Invalid length of " + path
              : validatorKey === "not_unique"
              ? "This team name is already in use."
              : "Unhandled valdation";
          message = message + "\n" + sub;
        }
        console.log(message);
      } else {
        console.log("Encountered an error to create a team.");
      }
      result = false;
    });
  return result;
};
const addTeamMember1 = async () => {
  let result = false;
  const teamId = 1; // from team 1
  const accountId = 2; //employee 1
  const memberType = 1; //manager
  const account = await Account.findByPk(accountId);
  if (account) {
    if (account.type === 2) {
      const isMember = await TeamMember.findOne({
        where: { accountId: accountId },
      });
      if (!isMember) {
        await TeamMember.create({
          memberType: memberType,
          accountId: accountId,
          teamId: teamId,
        })
          .then((response) => {
            const options = response._options;
            const isNewRecord = options.isNewRecord;
            if (isNewRecord) {
              result = true;
            } else {
              result = false;
            }
          })
          .catch((error) => {
            console.log(
              "Encountered an error while adding a member to a team."
            );
            result = false;
          });
      } else {
        console.log("This employee is already a member of a team.");
        result = false;
      }
    } else {
      console.log("Cannot add a non-employee to a team.");
      result = false;
    }
  } else {
    console.log("Failed to add a member to a team.");
    result = false;
  }
  return result;
};
const addTeamMember2 = async () => {
  let result = false;
  const teamId = 1; // from team 1
  const accountId = 3; //employee 2
  const memberType = 2; //member
  const account = await Account.findByPk(accountId);
  if (account) {
    if (account.type === 2) {
      const isMember = await TeamMember.findOne({
        where: { accountId: accountId },
      });
      if (!isMember) {
        await TeamMember.create({
          memberType: memberType,
          accountId: accountId,
          teamId: teamId,
        })
          .then((response) => {
            const options = response._options;
            const isNewRecord = options.isNewRecord;
            if (isNewRecord) {
              result = true;
            } else {
              result = false;
            }
          })
          .catch((error) => {
            console.log(
              "Encountered an error while adding a member to a team."
            );
            result = false;
          });
      } else {
        console.log("This employee is already a member of a team.");
        result = false;
      }
    } else {
      console.log("Cannot add a non-employee to a team.");
      result = false;
    }
  } else {
    console.log("Failed to add a member to a team.");
    result = false;
  }
  return result;
};
//owned project
const createOwnedProject = async () => {
  let result = false;
  const title = "Project 1";
  const description =
    "I am  a description of project 1 which is owned by team 1";
  const startDate = new Date(new Date().toDateString());
  const endDate = new Date(new Date().toDateString());
  const clientId = 4;
  const teamId = 1;
  await Project.create({
    title: title,
    description: description,
    startDate: startDate,
    endDate: endDate,
    teamId: teamId,
    accountId: clientId,
  })
    .then((response) => {
      if (response._options.isNewRecord) {
        result = true;
      } else {
        result = false;
      }
    })
    .catch((error) => {
      const errors = error.errors;
      if (errors) {
        let message = "";
        for (let i = 0; i < errors.length; i++) {
          const validatorKey = errors[i].validatorKey;
          const path = errors[i].path;
          const sub =
            validatorKey === "len"
              ? "Invalid length of " + path
              : validatorKey === "isDate"
              ? "Invalid date at " + path
              : validatorKey === "not_unique"
              ? "This title is already in use."
              : "Unhandled valdation";
          message = message + "\n" + sub;
        }
        console.log(message);
      } else {
        console.log("Failed to create an project.");
      }
      result = false;
    });
  return result;
};
//not owned project
const createNotOwnedProject = async () => {
  let result = false;
  const title = "Project 2";
  const description =
    "I am  a description of project 2 which is owned by no one";
  const startDate = new Date(new Date().toDateString());
  const endDate = new Date(new Date().toDateString());
  const clientId = null;
  const teamId = null;
  await Project.create({
    title: title,
    description: description,
    startDate: startDate,
    endDate: endDate,
    teamId: teamId,
    accountId: clientId,
  })
    .then((response) => {
      if (response._options.isNewRecord) {
        result = true;
      } else {
        result = false;
      }
    })
    .catch((error) => {
      const errors = error.errors;
      if (errors) {
        let message = "";
        for (let i = 0; i < errors.length; i++) {
          const validatorKey = errors[i].validatorKey;
          const path = errors[i].path;
          const sub =
            validatorKey === "len"
              ? "Invalid length of " + path
              : validatorKey === "isDate"
              ? "Invalid date at " + path
              : validatorKey === "not_unique"
              ? "This title is already in use."
              : "Unhandled valdation";
          message = message + "\n" + sub;
        }
        console.log(message);
      } else {
        console.log("Failed to create an project that is not owned.");
      }
      result = false;
    });
  return result;
};
