const _ = require('lodash')

const resourceList = {
  octo001: {
    resourceId: "octo001",
    title: "Steps Ahead mentoring",
    url: "https://www.cipd.co.uk/steps-ahead-mentoring",
    summary: "Steps Ahead offers one-to-one mentoring sessions to help jobseekers improve their employability skills, boost their confidence and find work.",
    journalMessage: "We've agreed that mentoring might help you - talking to someone with a bit of experience could be useful. \n\n Take a look at this site and sign up: \n\n https://www.cipd.co.uk/steps-ahead-mentoring",
    category: ["mentoring", "training"],
    groups: ["young jobseekers", "intensive work search"],
  },

  octo002: {
    resourceId: "octo002",
    title: "Skills for care",
    url: "https://www.cipd.co.uk/steps-ahead-mentoring",
    summary: "Helping social care employers to recruit, develop and lead their workforce.",
    journalMessage: "We've agreed that mentoring might help you - talking to someone with a bit of experience could be useful. \n\n Take a look at this site and sign up: \n\n https://www.cipd.co.uk/steps-ahead-mentoring",
    category: ["training", "care"],
    groups: ["young jobseekers", "intensive work search"],
  },

  octo003: {
    resourceId: "octo003",
    title: "My world of work CV Builder",
    url: "https://www.myworldofwork.co.uk/getting-job/building-cv",
    summary: "A simple tool to help a claimant build a CV",
    journalMessage: "We've agreed that mentoring might help you - talking to someone with a bit of experience could be useful. \n\n Take a look at this site and sign up: \n\n https://www.cipd.co.uk/steps-ahead-mentoring",
    category: ["CV and Resumes",],
    groups: ["young jobseekers", "intensive work search"],
  },

  octo004: {
    resourceId: "octo004",
    title: "National Careers Service skills health check",
    url: "https://nationalcareersservice.direct.gov.uk/skills-health-check/home",
    summary: "A questionnaire that will give claimants a good idea of their skills.",
    journalMessage: "https://nationalcareersservice.direct.gov.uk/skills-health-check/home",
    category: ["Skills and training",],
    groups: ["young jobseekers", "intensive work search"],
  },
};

function searchInSingleItem(object, query) {
  const objWithOnlyTextFields = _.pick(object, ['title', 'url', 'summary', 'journalMessage', 'category']);
  const foundFields = _.values(objWithOnlyTextFields).filter(it => it.toString().toLowerCase().includes(query.toLowerCase()));
  return foundFields.length > 0;
}

function search(query) {
  return _.values(resourceList).filter(it => searchInSingleItem(it, query))
}

module.exports = { search };
