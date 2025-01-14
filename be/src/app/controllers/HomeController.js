class HomeController {
  index(req, res) {
    res.render("home/index", { title: "Home page" });
  }

  hello(req, res) {
    res.status(200).json("Hello world!");
  }
}

module.exports = new HomeController();
