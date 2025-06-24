import "dotenv/config";
import fs from "fs";
import path from "path";

// Define the output file path for Sass variables
const outputPath = path.join(process.cwd(), "src", "styles", "tw_theme.scss");
if (fs.existsSync(outputPath)) {
  fs.unlinkSync(outputPath);
}

// Read environment variables
const sassVariables = `
@theme {
  --color-primary_color: ${process.env.NEXT_PUBLIC_PRIMARY_COLOR || "#F36E69"};
  --color-second_color: ${process.env.NEXT_PUBLIC_SECONDARY_COLOR || "#8C2425"};
  --color-accent_color_1: ${
    process.env.NEXT_PUBLIC_ACCENT_COLOR_1 || "#E9262C"
  };
  --color-accent_color_2: ${
    process.env.NEXT_PUBLIC_ACCENT_COLOR_2 || "#F8AFA8"
  };
  --color-black_color: ${process.env.NEXT_PUBLIC_BLACK_COLOR || "#09080D"};
  --color-white_color: ${process.env.NEXT_PUBLIC_WHITE_COLOR || "#FFFFFF"};

  --font-heading: "Baloo Da 2";
  --font-paragraph: "Roboto"
  }
`;

// Write the Sass variables to the file
fs.writeFileSync(outputPath, sassVariables, "utf8");
