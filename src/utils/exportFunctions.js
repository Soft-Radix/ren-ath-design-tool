import JSZip from "jszip";
import { saveAs } from "file-saver";
import html2pdf from "html2pdf.js";
import axios from "axios";
import logo from "/header.png";
import pattern1 from "/textures/pattern1.png";
import pattern2 from "/textures/pattern1.png";
import pattern3 from "/textures/pattern1.png";
import pattern4 from "/textures/pattern1.png";
import design from "/model-designs/W3/design6.png";
import { getLayerName } from "./modelsJson";
const ImgUrl = import.meta.env.VITE_IMAGE_BASE_URL;

// Helper function to convert image URLs to base64
const getBase64ImageFromUrl = async (imageUrl) => {
  try {
    const response = await axios.get(imageUrl, { responseType: "blob" });
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result); // Base64 result
      };
      reader.onerror = reject;
      reader.readAsDataURL(response.data); // Convert blob to base64
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};

// Fetch and download logos along with the PDF
export const fetchAndDownloadLogos = async (fileName, logos, userData) => {
  try {
    const zip = new JSZip();
    const logoFolder = zip.folder(fileName); // Create a folder for logos in the ZIP

    // Step 1: Download logos and add them to the zip
    const downloadPromises = logos.map(async (logo) => {
      const logoUrl = `${ImgUrl}${logo.logo}`; // Adjust the URL if needed
      const logoFileName = logo.name || "uploaded-file.png"; // Extract the file name or give a default name

      try {
        // Download each logo as a blob
        const response = await axios.get(logoUrl, { responseType: "blob" });

        // Await the addition of the file to ensure it's properly added
        await logoFolder.file(logoFileName, response.data);
      } catch (error) {
        console.error(`Failed to download ${logoFileName}:`, error);
      }
    });

    // Wait for all logos to download and be added to the zip
    await Promise.all(downloadPromises);

    // Step 2: Generate the PDF and add it to the zip
    const pdfBlob = await createAndDownloadPDF(userData);
    zip.file("user_info.pdf", pdfBlob);

    // Step 3: Generate the ZIP file and trigger download
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `${fileName}.zip`);
    });
  } catch (error) {
    console.error("Error fetching logos or creating PDF:", error);
  }
  return false;
};

// Generate the PDF with HTML content using html2pdf
export const createAndDownloadPDF = async (userData) => {
  // Convert images to base64 data
  const image1Base64 = await getBase64ImageFromUrl(userData.image1Url);
  const image2Base64 = await getBase64ImageFromUrl(userData.image2Url);

  // Check if images are loaded properly
  if (!image1Base64 || !image2Base64) {
    throw new Error("Failed to load one or more images.");
  }

  // Step 1: Create the HTML content dynamically with base64 images
  const htmlContent = createHTMLContent({
    ...userData,
    image1Base64,
    image2Base64,
  });

  // Step 2: Create a container and append the content
  const container = document.createElement("div");
  container.innerHTML = htmlContent;
  // document.body.appendChild(container); // Temporarily append to the body
  // Optional: Hide the container with CSS if appended temporarily
  // container.style.display = 'none'; // Hide the container

  // Step 3: Use html2pdf to convert the HTML to PDF
  return new Promise((resolve, reject) => {
    html2pdf()
      .from(container)
      .set({
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "portrait",
          format: "a4",
          margin: { bottom: 0.5 },
        },
        pagebreak: { mode: ["css", "legacy"] },
        filename: "user_info.pdf",
      })
      .outputPdf("blob")
      .then((pdfBlob) => {
        const style = document.createElement("style");
        style.innerHTML = `
          .html2pdf__page-break {
            page-break-before: always;
          }
        `;
        document.head.appendChild(style);
        // document.body.removeChild(container); // Remove the HTML after generating PDF
        resolve(pdfBlob); // Return the PDF blob
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Generate the HTML content for the PDF
export const createHTMLContent = (userData) => {
  const {
    team_name,
    image1Base64,
    image2Base64,
    colorPalette,
    name,
    design_name,
    userEmail,
    designInfo,
  } = userData;
  const patternObject = designInfo?.pattern;
  const designObject = designInfo?.design;
  const patternLayers = Object.keys(patternObject?.patternLayers);

  return `
  <div>
      <!-- Header -->
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 2px solid #ececec;
        "
      >
        <img src=${logo} alt="" width="100%" style="object-fit: fill" />
      </div>

      <!-- Info Row -->
      <div
        style="
          display: flex;
          justify-content: flex-start;
          gap: 10px;
          padding: 20px;
        "
      >
        <div
          style="
            background-color: #e4e9eb8c;
            padding: 15px 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
            justify-content: center;
            // min-width: 150px;
          "
        >
          <div style="font-weight: bold;white-space: nowrap;">Design Name</div>
          <div style="white-space:nowrap;">${design_name}</div>
        </div>
        <div
          style="
            background-color: #e4e9eb8c;
            padding: 25px 30px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
            justify-content: center;
            // min-width: 150px;
          "
        >
          <div style="font-weight: bold;white-space:nowrap;">Team Name</div>
          <div style="white-space:nowrap;">${team_name}</div>
        </div>
        <div
          style="
            background-color: #e4e9eb8c;
            padding: 25px 30px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
            justify-content: center;
            // min-width: 150px;
          "
        >
          <div style="font-weight: bold;white-space:nowrap;">User Name</div>
          <div style="white-space:nowrap;">${name}</div>
        </div>
        <div
          style="
            background-color: #e4e9eb8c;
            padding: 25px 30px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
            justify-content: center;
            // min-width: 150px;
          "
        >
          <div style="font-weight: bold;white-space:nowrap;">User Email Address</div>
          <div style="white-space:nowrap;">${userEmail}</div>
        </div>
      </div>

      <!-- Design Images Row -->
      <div
        style="
          display: flex;
          justify-content: start;
          gap: 30px;
          padding: 0px 40px;
        "
      >
        <!-- Design Front -->
        <div style="text-align: center">
          <div
            style="
              font-weight: bold;
              font-size: x-large;
              text-align: start;
              margin: 10px 0px;
            "
          >
            Design Front
          </div>
          <div style="border: 1px solid #ececec; border-radius: 10px">
            <img
              src=${image1Base64}
              alt="Design Front"
              style="height: 300px; width: 250px"
            />
          </div>
        </div>

        <!-- Design Back -->
        <div style="text-align: center">
          <div
            style="
              font-weight: bold;
              font-size: x-large;
              text-align: start;
              margin: 10px 0px;
            "
          >
            Design Back
          </div>
          <div style="border: 1px solid #ececec; border-radius: 10px">
            <img
              src=${image2Base64}
              alt="Design Back"
              style="height: 300px; width: 250px"
            />
          </div>
        </div>
      </div>

      <!-- Color Info and Design Info -->
      <div
        style="
          display: flex;
          justify-content: flex-start;
          padding: 40px;
          gap: 60px;
        "
      >
        <!-- Pantone Info -->
        <div style="width: 300px">
          <div
            style="
              font-weight: bold;
              font-size: x-large;
              text-align: start;
              margin: 10px 0px;
            "
          >
            Pantone Info
          </div>
          <div style="display: flex; flex-direction: column; padding: 10px">
          ${colorPalette
            ?.map(
              (color) =>
                ` <div style="display: flex; align-items: center; margin-bottom: 10px">
                <div
                  style="
                width: 40px;
                height: 40px;
                background-color: ${color};
                margin-right: 10px;
              "
                ></div>
                <div>${color}</div>
              </div>`
            )
            .join("")}
          </div>
        </div>

        <!-- Design Info -->
        <div style="text-align: center">
          <div
            style="
              font-weight: bold;
              font-size: x-large;
              text-align: start;
              margin: 10px 0px;
            "
          >
            Design Info
          </div>
          <div style="border: 1px solid #ececec; padding: 20px">
            <img src="/model-designs/W3/design${
              designObject?.designType
            }.png" alt="Design Info" style="width: 200px" />
          </div>
        </div>
      </div>
</br>
</br>
      <!-- Pattern Info -->
      <div style="padding:0px 40px" class="html2pdf__page-break">
        <div
          style="
            font-weight: bold;
            font-size: x-large;
            text-align: start;
            margin: 0px 0px;
          "
        >
          Pattern Info
        </div>
        <div style="display: flex; justify-content: flex-start;gap: 30px;padding: 20px;flex-wrap:wrap">
       ${patternLayers?.map(
         (layer) => `
        <div style="text-align: center">
            <img
              src="/${patternObject?.patternLayers[layer]}"
              alt="Pattern Front"
              style="width: 150px; height: 100px"
            />
            <div>${getLayerName(layer)}</div>
          </div>
        `
       )}
        </div>
      </div>
    </div>`;
};
