const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace(
  /if \(process\.env\.NODE_ENV !== "production"\) \{\s*const fs = await import\("fs"\);\s*const filePath = path\.join\(process\.cwd\(\), "src", "cms_home\.json"\);\s*await fs\.promises\.writeFile\(filePath, JSON\.stringify\(req\.body, null, 2\)\);\s*\}/,
  `const fs = await import("fs");
      const filePath = path.join(process.cwd(), "src", "cms_home.json");
      await fs.promises.writeFile(filePath, JSON.stringify(req.body, null, 2));`
);
fs.writeFileSync('server.ts', code);
