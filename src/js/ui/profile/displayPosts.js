import { fetchUserPosts } from '../../api/profile/read.js';

/**
 * Renders the user's posts by fetching them from the API and updating the DOM.
 * 
 * @async
 * @function renderUserPosts
 * @throws {Error} If the fetched posts are not an array or if there is an error while fetching posts.
 */
async function renderUserPosts() {
    const postContainer = document.getElementById('postContainer');

    try {
        const posts = await fetchUserPosts();

        if (!Array.isArray(posts)) {
            throw new Error('Fetched posts is not an array');
        }

        // Clear the container to ensure it starts empty
        postContainer.innerHTML = '';

        // Check if there are posts to display
        if (posts.length === 0) {
            postContainer.innerHTML = '<p>No posts found.</p>';
            return;
        }

        // Loop through each post and create the layout dynamically
        posts.forEach(post => {
            const postCol = document.createElement('div');
            postCol.classList.add('col'); // Bootstrap column class

            // Create the link element wrapping the card
            const postLink = document.createElement('a');
            postLink.href = `/post/view/?id=${post.id}`; // URL for the single post page
            postLink.classList.add('text-decoration-none'); // Optional: remove underline

            const card = document.createElement('div');
            card.classList.add('card', 'h-100'); // Bootstrap card with full height

            // Create the media/image section if there is a media URL
            if (post.media) {
                const postMedia = document.createElement('img');
                postMedia.src = post.media.url;
                postMedia.alt = post.media.alt || 'Media';
                postMedia.classList.add('card-img-top'); // Bootstrap image class for card top
                card.appendChild(postMedia);
            }

            // Create the card body section
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const postTitle = document.createElement('h5');
            postTitle.classList.add('card-title');
            postTitle.textContent = post.title;

            // Append title to card body
            cardBody.appendChild(postTitle);

            // Append card body to card
            card.appendChild(cardBody);

            // Append the card to the link, making the whole card clickable
            postLink.appendChild(card);

            // Append the link (which now contains the card) to the column
            postCol.appendChild(postLink);

            // Append the column to the container
            postContainer.appendChild(postCol);
        });
    } catch (error) {
        console.error('Error loading user posts:', error);
        postContainer.innerHTML = '<p>Failed to load posts. Please try again later.</p>';
    }
}

renderUserPosts();
