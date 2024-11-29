document.addEventListener('DOMContentLoaded', function() {
    // Select the container where courses and categories will be displayed
    const coursesContainer = document.querySelector(".courses");
    const categoryListElement = document.getElementById("category-list");

    // Fetch and display categories in the sidebar
    async function fetchCategories() {
        const apiUrl = "http://api.cc.localhost/categories";  // Replace with actual API endpoint

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }

            const categories = await response.json();  // Parse the JSON data

            // Clear any existing categories in the sidebar
            categoryListElement.innerHTML = '';

            // Loop through the categories and create category links
            categories.forEach(category => {
                const categoryItem = document.createElement("li");

                // Create a link for the category with the required URL format
                const categoryLink = document.createElement("a");
                categoryLink.href = `#`;  // Prevent actual navigation
                categoryLink.textContent = category.name;
                categoryLink.dataset.categoryId = category.id;// Store category ID in data attribute

                //add h5 to put count of courses in each category
                const countCourses = document.createElement("h5");
                countCourses.textContent = `(${category.count_of_courses})`;
                categoryLink.appendChild(countCourses);


                // Add event listener to filter courses by category when clicked
                categoryLink.addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent default link behavior
                    const categoryId = categoryLink.dataset.categoryId;  // Get category ID
                    fetchCoursesByCategory(categoryId); // Fetch courses filtered by category
                });

                // Append the link to the category item, then the item to the sidebar list
                categoryItem.appendChild(categoryLink);
                categoryListElement.appendChild(categoryItem);
            });

        } catch (error) {
            console.error("Error fetching categories:", error);
            categoryListElement.innerHTML = "<li>Error loading categories. Please try again later.</li>";
        }
    }

    // Fetch courses from the API
    async function fetchCourses() {
        // Show loading message
        coursesContainer.innerHTML = "<p>Loading courses...</p>";

        try {
            const response = await fetch('http://api.cc.localhost/courses', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const courses = await response.json();

            // Clear the loading message after fetching data
            coursesContainer.innerHTML = "";

            // Loop through the courses and create cards for each
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
            console.error("Error fetching courses:", error);
            // Show error message if there was a problem fetching courses
            coursesContainer.innerHTML = "<p>Sorry, there was an error loading the courses. Please try again later.</p>";
        }
    }

    // Fetch courses filtered by category ID
    async function fetchCoursesByCategory(categoryId) {
        // Show loading message while fetching filtered courses
        coursesContainer.innerHTML = "<p>Loading courses...</p>";

        const apiUrl = `http://api.cc.localhost/courses/category/${categoryId}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch courses for this category");
            }

            console.log(response);

            const courses = await response.json();

            // Clear the loading message after fetching data
            coursesContainer.innerHTML = "";

            // Loop through the courses and create course cards for the filtered courses
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
            console.error("Error fetching filtered courses:", error);
            // Show error message if there was a problem fetching the filtered courses
            coursesContainer.innerHTML = "<p>Sorry, there was an error loading the filtered courses. Please try again later.</p>";
        }
    }

    // Initialize the page by fetching categories and courses
    function init() {
        fetchCategories();  // Fetch and display categories
        fetchCourses();     // Fetch and display all courses
    }

    // Run the initialization
    init();
});
