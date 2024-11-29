
// Select the container where courses will be displayed
const coursesContainer = document.querySelector(".courses");

// Fetch data from the API


document.addEventListener('DOMContentLoaded', function() {

    async function fetchCourses() {
        // Show loading message
        coursesContainer.innerHTML = "<p>Loading courses...</p>";

        try {
            // Fetch the course data from the API
            const response = await fetch('http://api.cc.localhost/courses', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const courses = await response.json();

            // Clear the loading message after fetching data
            coursesContainer.innerHTML = "";

            // Loop through the courses data and create course cards
            courses.forEach(course => {
                const courseCard = document.createElement("div");
                courseCard.classList.add("course-card");

                // Build the course card content
                courseCard.innerHTML = `
                <img src="${course.image_preview}" alt="${course.title}">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
            `;

                // Append the course card to the container
                coursesContainer.appendChild(courseCard);
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            // Show error message if there was a problem fetching data
            coursesContainer.innerHTML = "<p>Sorry, there was an error loading the courses. Please try again later.</p>";
        }
    }
    // Function to fetch categories and display them in the sidebar
    async function fetchCategories() {
        const categoryListElement = document.getElementById("category-list");
        const apiUrl = "http://api.cc.localhost/categories";  // Replace with actual API endpoint

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }

            const categories = await response.json();  // Parse the JSON data

            // Clear existing categories in the sidebar (if any)
            categoryListElement.innerHTML = '';

            // Loop through the categories and add them to the sidebar
            categories.forEach(category => {
                const categoryItem = document.createElement("li");

                // Create a link for the category with the required URL format
                const categoryLink = document.createElement("a");
                categoryLink.href = `http://api.cc.localhost/categories/${category.id}`;  // Dynamically generate the category link
                categoryLink.textContent = category.name;
                categoryLink.dataset.categoryId = category.id;  // Store the category ID in a data attribute

                // Append the link to the category list item
                categoryItem.appendChild(categoryLink);

                // Append the category item to the sidebar list
                categoryListElement.appendChild(categoryItem);
            });

        } catch (error) {
            console.error("Error fetching categories:", error);
            categoryListElement.innerHTML = "<li>Error loading categories. Please try again later.</li>";
        }
    }

    fetchCategories();
    fetchCourses();
    // Call the fetchCategories function on page load
});


// Call the fetchCourses function to load the courses when the page loads
