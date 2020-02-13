var model = require("../models/index");
module.exports = function(app) {
  const { check, validationResult } = require("express-validator");
  /* GET todo listing. */
  app.get("/books", function(req, res, next) {
    model.`bukuseqq`
      .findAll({})
      .then(bukuseqqs =>
        res.json({
          error: false,
          data: bukuseqqs
        })
      )
      .catch(error =>
        res.json({
          error: true,
          data: [],
          error: error
        })
      );
  });
  /* POST todo. */
  app.post(
    "/books",
    [
      check("title")
        .notEmpty()
        .withMessage("title tidak boleh kosong")
        .isLength({ min: 5 })
        .withMessage("title tidak boleh kurang dari 5"),

      check("author")
        .notEmpty()
        .withMessage("author tidak boleh kosong")
        .isLength({ min: 5 })
        .withMessage("author tidak boleh kurang dari 5"),

      check("publish_date")
        .isISO8601()
        .withMessage("Format tanggal tidak sesuai"),

      check("pages")
        .isInt()
        .withMessage("Sesuaikan dengan format angka!")
        .notEmpty()
        .withMessage("pages tidak boleh kosong"),

      check("language")
        .notEmpty()
        .withMessage("Bahasa tidak boleh kosong"),

      check("publisher_id")
        .notEmpty()
        .withMessage("ID Publisher tidak boleh kosong")
    ],
    function(req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const {
        title,
        author,
        publish_date,
        pages,
        language,
        publisher_id
      } = req.body;
      model.bukuseqq
        .create({
          title: title,
          author: author,
          publish_date: publish_date,
          pages: pages,
          language: language,
          publisher_id: publisher_id
        })
        .then(bukuseqqs =>
          res.status(201).json({
            error: false,
            data: bukuseqqs,
            message: "Data Buku Telah Ditambah"
          })
        )
        .catch(error =>
          res.json({
            error: true,
            data: [],
            error: error
          })
        );
    }
  );

  app.put(
    "/books/:id",
    [
      check("title")
        .notEmpty()
        .withMessage("title tidak boleh kosong")
        .isLength({ min: 5 })
        .withMessage("title tidak boleh kurang dari 5"),

      check("author")
        .notEmpty()
        .withMessage("author tidak boleh kosong")
        .isLength({ min: 5 })
        .withMessage("author tidak boleh kurang dari 5"),

      check("publish_date")
        .isISO8601()
        .withMessage("Format tanggal tidak sesuai"),

      check("pages")
        .isInt()
        .withMessage("Sesuaikan dengan format angka!")
        .notEmpty()
        .withMessage("pages tidak boleh kosong"),

      check("language")
        .notEmpty()
        .withMessage("Bahasa tidak boleh kosong"),

      check("publisher_id")
        .notEmpty()
        .withMessage("ID Publisher tidak boleh kosong")
    ],
    function(req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const idbuku = req.params.id;
      const {
        title,
        author,
        publish_date,
        pages,
        language,
        publisher_id
      } = req.body;
      model.bukuseqq
        .update(
          {
            title: title,
            author: author,
            publish_date: publish_date,
            pages: pages,
            language: language,
            publisher_id: publisher_id
          },
          {
            where: {
              id: idbuku
            }
          }
        )

        .then(bukuseqqs =>
          res.json({
            error: false,
            message: "Data Buku Telah Diupdate"
          })
        )
        .catch(error =>
          res.json({
            error: true,
            error: error
          })
        );
    }
  );
  /* GET todo listing. */
  /* Delete todo. */
  app.delete("books/:id", function(req, res, next) {
    const todo_id = req.params.id;
    model.bukuseqq.destroy({
      where: {
        id: todo_id
      }
    })
      .then(status =>
        res.json({
          error: false,
          message: "data has been delete."
        })
      )
      .catch(error =>
        res.json({
          error: true,
          error: error
        })
      );
  });
};
