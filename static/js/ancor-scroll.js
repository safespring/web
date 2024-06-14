document.addEventListener("DOMContentLoaded", function() {
    function adjustScrollOffset() {
        // Get the hash from the URL
        const hash = window.location.hash;

        if (hash) {
            setTimeout(() => {
                // Find the element with the corresponding ID
                const element = document.querySelector(hash);

                if (element) {
                    // Calculate the top position of the element minus the offset
                    const offset = 100;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - offset;

                    // Scroll to the calculated position
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }, 300); // Delay in milliseconds
        }
    }

    // Adjust scroll when the page loads
    window.addEventListener("load", adjustScrollOffset);

    // Adjust scroll when the hash changes (i.e., when a link is clicked)
    window.addEventListener("hashchange", adjustScrollOffset);

    // Also check if the hash changes directly without reloading
    if (window.location.hash) {
        adjustScrollOffset();
    }
});