const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace(
  /app\.post\("\/api\/cms\/home"/,
  `app.post("/api/cms/categories", async (req, res) => {
    try {
      const fs = await import("fs");
      const filePath = path.join(process.cwd(), "src", "cms_categories.json");
      await fs.promises.writeFile(filePath, JSON.stringify(req.body, null, 2));
      res.json({ success: true });
    } catch (err: any) {
      console.error("Error saving CMS categories:", err.message);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/cms/home"`
);
fs.writeFileSync('server.ts', code);
