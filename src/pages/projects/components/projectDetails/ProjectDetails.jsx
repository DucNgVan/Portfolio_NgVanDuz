import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
/* eslint-disable react/no-array-index-key */
import clsx from 'clsx';
import styles from '@src/pages/projects/components/projectDetails/styles/projectDetails.module.scss';

function ProjectDetails({ project }) {
  const isLiveDemo =
    project.isLive ||
    (project.liveLink && !project.liveLink.includes('github.com'));

  return (
    <div className={styles.root}>
      {isLiveDemo ? (
        <div className={styles.liveBadge}>
          <span className={styles.liveDot} />
          LIVE DEMO
        </div>
      ) : null}
      <h3 className={clsx(styles.title, 'h3')}>{project.title}</h3>
      <h4 className={clsx(styles.date, 'h4')}>
        ({project.date}) {project.company ? `· ${project.company}` : ''}
      </h4>
      <div className={styles.others}>
        <div className={styles.desc}>
          {project.desc.map((des, index) => (
            <div className="p-l" key={`${project.title}-${index}`}>
              {des}
            </div>
          ))}
        </div>
        {project.liveLink ? (
          <div className={styles.buttonContainer}>
            <ButtonLink
              target
              href={project.liveLink}
              label={isLiveDemo ? 'VISIT LIVE SITE' : 'VIEW GITHUB REPO'}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default ProjectDetails;
