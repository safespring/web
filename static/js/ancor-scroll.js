document.addEventListener("DOMContentLoaded", function() {
    // Function to adjust scroll position with offset
    function adjustScrollOffset() {
        // Get the hash from the URL
        const hash = window.location.hash;

        if (hash) {
            // Delay to ensure the browser's default jump happens first
            setTimeout(() => {
                // Find the element with the corresponding ID
                const element = document.querySelector(hash);

                if (element) {
                    // Calculate the top position of the element minus the offset
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - 100; // Adjust 100px offset

                    // Scroll to the calculated position
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }, 100); // Delay in milliseconds
        }
    }

    // Adjust scroll when the page loads
    adjustScrollOffset();

    // Adjust scroll when the hash changes (i.e., when a link is clicked)
    window.addEventListener("hashchange", function() {
        adjustScrollOffset();
    });
});