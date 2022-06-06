import './style.scss';

import CardAbout from 'src/components/About/CardAbout';

import devs from 'src/assets/data/about.json';

const About = () => (
  <div className="about">
    <h2 className="about__title">Notre équipe</h2>
    <div className="about__cards">
      {
        devs.map((dev) => (
          <CardAbout
            key={dev.lastname}
            dev={dev}
          />
        ))
      }
    </div>
  </div>
);

export default About;
