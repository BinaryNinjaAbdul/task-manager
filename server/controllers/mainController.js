/***
 * GET /
 * homepage
 */

exports.homepage = (req, res) => {
  const locals = {
    title: "Task Manager",
    description: "Free Taks Manager App",
  };

  res.render("index", {
    locals, 
    layout: '../views/layouts/front-page'
  });
};

/***
 * GET /about
 * About
 */

exports.about = (req, res) => {
    const locals = {
      title: "About",
      description: "Free Taks Manager App",
    };
    
    res.render("about", locals);
  };
  