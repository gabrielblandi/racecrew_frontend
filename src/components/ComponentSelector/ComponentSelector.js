import React from 'react';
import HomePage from '../../pages/HomePage/HomePage';
import MainPage from '../../pages/MainPage/MainPage';
const componentMapping = {
    HomePage,
    MainPage
  };

  const ComponentRender = ({ Render }) => {
    return (
      <div>
        {Render.map((componentName) => {
          const Component = componentMapping[componentName];
          return <Component key={componentName} />;
        })}
      </div>
    );
  };

  export default ComponentRender;