const mongoose = require("mongoose");
const Task = require("../models/Task");

/***
 * GET /
 * Dashboard
 */

exports.dashboard = async (req, res) => {
  const locals = {
    title: "Dashboard",
    description: "Free Taks Manager App",
  };

  try {
    const tasks = await Task.aggregate([
      { $sort: { updatedAt: -1 } },
      { $match: { user: new mongoose.Types.ObjectId(req.user._id) } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      },
    ]);

    res.render("dashboard/index", {
      userName: req.user.firstName,
      locals,
      tasks,
      layout: "../views/layouts/dashboard",
    });
  } catch (err) {
    console.log(err);
  }
};

/***
 * View Specific note
 * /dashboard/item/:id
 */

exports.dashboardViewNode = async (req, res) => {
  const task = await Task.findById({ _id: req.params.id })
    .where({
      user: req.user._id,
    })
    .lean();

  if (task) {
    res.render("dashboard/view-task", {
      local: {
        title: task.title,
      },
      taskId: req.params.id,
      task,
      layout: "../views/layouts/dashboard",
    });
  } else {
    res.send("Somethign went wrong");
  }
};

/***
 * PUT /
 * /dashboard/item/:id
 */

exports.dashboardUpdateNode = async (req, res) => {
  try {
    await Task.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        title: req.body.title,
        body: req.body.body,
      }
    ).where({
      user: req.user._id,
    });

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

/***
 * Delete/
 * Delete Task
 */

exports.dashboardDeleteNode = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id }).where({
      user: req.user._id,
    });

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

/***
 * Get /
 * Add Task
 */

exports.dashboardAddTask = async (req, res) => {
  res.render("dashboard/add-note", {
    local: {
      title: "Add Task",
    },
    layout: "../views/layouts/dashboard",
  });
};

/***
 * POST /
 * Add Task
 */

exports.dashboardAddTaskSumit = async (req, res) => {
  try {
    req.body.user = req.user._id;
    await Task.create(req.body);

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

/***
 * GET /
 * Search
 */

exports.dashboardSearch = async (req, res) => {
  try {
    res.render("dashboard/search", {
      searchResults: "",
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};

/***
 * POST /
 * Add Task
 */

exports.dashboardSearchSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTem;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const searchResults = await Task.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    }).where({ user: req.user._id });

    res.render('dashboard/search', {
      searchResults,
      layout: "../views/layouts/dashboard",
    })
  } catch (error) {
    console.log(error);
  }
};
