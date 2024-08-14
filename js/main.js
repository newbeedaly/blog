function loadMarkdown(filename) {
  fetch(`./markdown/${filename}.md`)
    .then(response => response.text())
    .then(text => {
      // Convert Markdown to HTML using marked
      const html = marked.parse(text);

      // Insert the HTML into the article element
      const contentElement = document.getElementById('markdown-content');
      contentElement.innerHTML = html;

      // Generate Table of Contents
      const tocList = document.getElementById('toc-list');

      // Clear previous TOC
      tocList.innerHTML = ''; 

      // Find all header tags
      const headers = contentElement.querySelectorAll('h1, h2, h3');

      // Track the generated IDs to avoid duplicates
      const idMap = {};

      headers.forEach(header => {
        let headerId = header.textContent.trim().replace(/\s+/g, '-').toLowerCase();

        // 如果id已经存在，则添加索引以确保唯一性
        if (idMap[headerId]) {
          idMap[headerId] += 1;
          headerId = `${headerId}-${idMap[headerId]}`;
        } else {
          idMap[headerId] = 1;
        }

        header.id = headerId;

        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${headerId}`;
        link.textContent = header.textContent;

        listItem.appendChild(link);

        // Add indentation for different levels of headers
        if (header.tagName.toLowerCase() === 'h1') {
          listItem.classList.add('toc-h1');
        } else if (header.tagName.toLowerCase() === 'h2') {
          listItem.classList.add('toc-h2');
        } else if (header.tagName.toLowerCase() === 'h3') {
          listItem.classList.add('toc-h3');
        }

        tocList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching the markdown file:', error));
};

// Load the first markdown file by default
loadMarkdown('Index');
