import Section from "./section";
import Badge from "./badge";

const WorkSection = () => (
  <Section id="work" title="Work Experience">
    <div className="space-y-8">

      {/* Fidelity Investments */}
      <div className="bg-card rounded-3xl p-8 shadow-card-lg border border-border hover:shadow-card-xl transition-all duration-300 group">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-primary group-hover:text-secondary transition-colors duration-300">
              Fidelity Investments
            </h3>
            <p className="text-xl font-semibold text-muted mt-1">Senior Full Stack Developer</p>
          </div>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-semibold text-sm mt-4 lg:mt-0 self-start">
            Apr 2024 – Present
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge text="Angular" variant="primary" />
          <Badge text="Python FastAPI" variant="secondary" />
          <Badge text="Neo4j" variant="accent" />
          <Badge text="Graph Databases" variant="muted" />
          <Badge text="REST APIs" variant="primary" />
          <Badge text="Generative AI" variant="secondary" />
          <Badge text="AWS" variant="accent" />
        </div>
        
        <ul className="space-y-3 text-muted">
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <span>Developed and maintained a scalable chatbot application using Angular and Python FastAPI.</span>
          </li>
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <span>Designed and implemented a Neo4j graph database for efficient data storage and relationship mapping.</span>
          </li>
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <span>Leveraged Generative AI to automate decision-making, improving response accuracy and user experience.</span>
          </li>
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <span>Applied best practices in RESTful API development and graph data modeling to improve scalability and performance.</span>
          </li>
        </ul>
      </div>

      {/* Flipt LLC */}
      <div>
        <h3 className="text-xl lg:text-2xl font-bold">
          Flipt LLC - Senior Full Stack Developer
        </h3>
        <p className="text-gray-700">Nov 2021 – Mar 2024</p>
        <div className="py-4">
          <Badge text="React" />
          <Badge text="Streamlit" />
          <Badge text="Couchbase" />
          <Badge text="N1QL" />
          <Badge text="REST APIs" />
          <Badge text="JSON Rules Engine" />
          <Badge text="CircleCI" />
          <Badge text="Airflow" />
          <Badge text="Python" />
        </div>
        <ul className="list-disc pl-6 space-y-1">
          <li>Built a self-service adjudication tool for large pharmaceutical corporations.</li>
          <li>Developed React SPA screens reducing concierge response times by 50%.</li>
          <li>Architected an AI-powered Q&A portal using OpenAI’s API and Streamlit.</li>
          <li>Implemented RBAC with React for multiple users, roles, and organizations.</li>
          <li>Built REST APIs for approval processes using JSON rules and chaining for multi-level approvals.</li>
          <li>Engineered CI/CD pipelines with CircleCI to automate testing, builds, and deployments.</li>
          <li>Created Airflow jobs in Python to automate drug list generation for each organization.</li>
        </ul>
      </div>

      {/* United Nations */}
      <div className="bg-card rounded-3xl p-8 shadow-card-lg border border-border hover:shadow-card-xl transition-all duration-300 group">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-primary group-hover:text-secondary transition-colors duration-300">
              United Nations
            </h3>
            <p className="text-xl font-semibold text-muted mt-1">Full Stack Developer</p>
          </div>
          <div className="bg-accent/10 text-accent px-4 py-2 rounded-xl font-semibold text-sm mt-4 lg:mt-0 self-start">
            May 2019 – Oct 2021
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge text="Node.js" variant="primary" />
          <Badge text="Angular" variant="secondary" />
          <Badge text="MongoDB" variant="accent" />
          <Badge text="AWS" variant="muted" />
          <Badge text="GitLab CI/CD" variant="primary" />
          <Badge text="Python" variant="secondary" />
        </div>
        
        <ul className="space-y-3 text-muted">
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
            <span>Migrated Lotus Notes applications to web-based service catalog using MEAN stack.</span>
          </li>
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
            <span>Parsed PDFs/XMLs into MongoDB with Node.js, reducing manual effort by <span className="font-semibold text-accent">80%</span>.</span>
          </li>
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
            <span>Developed Angular SPA with role-based data export and management.</span>
          </li>
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
            <span>Implemented CI/CD pipelines with AWS CodePipeline, ECS, and GitLab reducing build/test time by <span className="font-semibold text-accent">50%</span>.</span>
          </li>
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
            <span>Created Python scripts for data migration and unit testing with Karma/Jasmine.</span>
          </li>
        </ul>
      </div>

      {/* MCG LLC */}
      <div className="bg-card rounded-3xl p-8 shadow-card-lg border border-border hover:shadow-card-xl transition-all duration-300 group">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-primary group-hover:text-secondary transition-colors duration-300">
              MCG LLC (VMware)
            </h3>
            <p className="text-xl font-semibold text-muted mt-1">Software & Automation Engineer</p>
          </div>
          <div className="bg-muted/10 text-muted px-4 py-2 rounded-xl font-semibold text-sm mt-4 lg:mt-0 self-start">
            Aug 2018 – Apr 2019
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge text="ServiceNow" variant="primary" />
          <Badge text="vRA" variant="secondary" />
          <Badge text="VMware" variant="accent" />
          <Badge text="Random Forest" variant="muted" />
          <Badge text="Python" variant="primary" />
          <Badge text="NGINX" variant="secondary" />
        </div>
        
        <ul className="space-y-3 text-muted">
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-muted rounded-full mt-2 flex-shrink-0"></div>
            <span>Built AI-backed console to integrate ServiceNow with VMware vRealize for VM provisioning/monitoring.</span>
          </li>
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-muted rounded-full mt-2 flex-shrink-0"></div>
            <span>Created Random Forest regression model to predict VM type/size with <span className="font-semibold text-primary">82% accuracy</span>.</span>
          </li>
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-muted rounded-full mt-2 flex-shrink-0"></div>
            <span>Automated NGINX server installation via ServiceNow MID server, reducing build times by <span className="font-semibold text-primary">10%</span>.</span>
          </li>
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-muted rounded-full mt-2 flex-shrink-0"></div>
            <span>Designed monitoring dashboard with auto-scaling alerts for cost optimization.</span>
          </li>
        </ul>
      </div>

      {/* ServiceNow */}
      <div className="bg-card rounded-3xl p-8 shadow-card-lg border border-border hover:shadow-card-xl transition-all duration-300 group">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-primary group-hover:text-secondary transition-colors duration-300">
              ServiceNow
            </h3>
            <p className="text-xl font-semibold text-muted mt-1">Technical Engineer Intern</p>
          </div>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-semibold text-sm mt-4 lg:mt-0 self-start">
            May 2017 – Jun 2018
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge text="JavaScript" variant="primary" />
          <Badge text="ServiceNow" variant="secondary" />
          <Badge text="Event Logs" variant="accent" />
        </div>
        
        <ul className="space-y-3 text-muted">
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <span>Built application to monitor live instances and push auto-update email notifications.</span>
          </li>
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <span>Improved quarterly patch program efficiency by <span className="font-semibold text-primary">20%</span> through automated log parsing and triggers.</span>
          </li>
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <span>Resolved multiple bugs in client monitoring/logging applications working with cross-functional teams.</span>
          </li>
        </ul>
      </div>

    </div>
  </Section>
);

export default WorkSection;
