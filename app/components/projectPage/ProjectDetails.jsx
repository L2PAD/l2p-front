import HTMLReactParser from 'html-react-parser'
import ProjectInfoBlock from "../../assets/components/projectInfoBlock/ProjectInfoBlock";
import TimeBanner from "./TimeBanner";
import ProjectFilter from "../../assets/components/projectFilter/ProjectFilter";
import styles from "../styles/project-details.module.scss";

const filtersInitialState = [
    {
        title:'Investors',
        isSelect:true,
    },
    {
        title:'Team',
        isSelect:false,
    },
    {
        title:'Partners',
        isSelect:false,
    },
]

const steps = [
  'Key Metrics',
  'Overview',
  'Investors',
  'Token Utility',
  'Revenue',
  'Token Metrics',
  'Terms And Conditions',
]

const ProjectDetails = ({project}) => {
  console.log(project)
  return (
    <div className={styles.wrapper}>
        <div className={styles.body}>
            <div className={styles.bodyLine}>
            </div>
            <div className={styles.title}>
            Key Metrics
            </div>
            <div className={styles.columns}>
            <div className={styles.column}>
        <div className={styles.columnItem}>
          <span className={styles.key}>Blockchain Network: </span>
          <span className={styles.value}>{project?.blockchain}</span>
        </div>
        <div className={styles.columnItem}>
          <span className={styles.key}>Total Supply: </span>
          <span className={styles.value}>{project.totalSupply || '-'}</span>
        </div>
        <div className={styles.columnItem}>
          <span className={styles.key}>Project Valuation: </span>
          <span className={styles.value}>
            {project?.valuation || "-"}
          </span>
        </div>
            </div>
            <div className={styles.column}>
        <div className={styles.columnItem}>
          <span className={styles.key}>Initial Market Cap: </span>
          <span className={styles.value}>{`${project.inititialMarketCap || 0}`}</span>
        </div>
        <div className={styles.columnItem}>
          <span className={styles.key}>Hard Cap: </span>
          <span className={styles.value}>{`${project.hardCap || 0}`}</span>
        </div>

          <div className={styles.columnItem}>
            <span className={styles.key}>Platform Raise: </span>
            <span className={styles.value}>{`${project.goal}`}</span>
          </div>
            </div>
            </div>
            <div className={styles.overview}>
            <div className={styles.title}>
                Overview
            </div>
            <div className={styles.text}>
              {HTMLReactParser(project?.overviewText || '')}
            </div>
            </div>
            <div className={styles.filtersInfo}>
              <ProjectFilter 
              project={project} 
              filtersInitialState={filtersInitialState}/>  
            </div>
            <div className={styles.infoBlock}>
                <div className={styles.title}>
                    Token Utility
                </div>
                <div className={styles.text}>
                {HTMLReactParser(project?.tokenUtilityText || '')}

                </div>
            </div>
            <div className={styles.infoBlock}>
                <div className={styles.title}>
                    Revenue
                </div>
                <div className={styles.text}>
                {HTMLReactParser(project?.revenueText || '')}

                </div>
            </div>
            <div className={styles.infoBlockImg}>
                <div className={styles.title}>
                    Token Metrics
                </div>
                <ProjectInfoBlock 
                img={project.projectImg}/>
            </div>
        </div>
        <TimeBanner 
        steps={steps}
        date={project.dateEnd} 
        time={project.timeEnd}
        />
    </div>
    
  );
};

export default ProjectDetails;
