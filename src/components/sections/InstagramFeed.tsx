const INSTAGRAM_POSTS = [
  { src: 'https://www.instagram.com/p/DH4hG1OOvXs/embed', title: 'Instagram post 1' },
  { src: 'https://www.instagram.com/p/DOn4DSPDjtE/embed', title: 'Instagram post 2' },
  { src: 'https://www.instagram.com/p/DNgMCYQuYgF/embed', title: 'Instagram post 3' },
] as const;

function InstagramFeed() {
  return (
    <section className="instagram-section">
      <h2 className="instagram-title">Síguenos en Instagram</h2>
      <div className="instagram-posts">
        {INSTAGRAM_POSTS.map((post) => (
          <iframe
            key={post.src}
            src={post.src}
            title={post.title}
            className="instagram-embed"
            frameBorder={0}
            scrolling="no"
          />
        ))}
      </div>
    </section>
  );
}

export default InstagramFeed;
