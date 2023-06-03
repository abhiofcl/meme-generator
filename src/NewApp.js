import React from "react";

class NewApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memes: [],
      afterToken: "",
    };
  }
  componentDidMount() {
    this.fetchMemes();
  }
  fetchMemes = () => {
    let url = "https://www.reddit.com/r/memes.json";
    if (this.state.afterToken) {
      url += `?after=${this.state.afterToken}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const newMemes = data.data.children.map((child) => child.data);
        const filteredMemes = newMemes.filter((meme) => {
          // Check if the URL does not end with .gif
          return !meme.url.toLowerCase().endsWith(".gif");
        });
        this.setState((prevState) => ({
          memes: [...prevState.memes, ...filteredMemes],
          afterToken: data.data.after,
        }));
      })
      .catch((error) => {
        console.error("Error fetching memes:", error);
      });
  };

  render() {
    const { memes, afterToken } = this.state;
    return (
      <div className="newApp">
        <h1>Memes</h1>
        <ul>
          {memes.map((meme) => (
            <li key={meme.id}>
              <h3>{meme.title}</h3>
              <img src={meme.url} alt={meme.title} />
            </li>
          ))}
        </ul>
        {afterToken && <button onClick={this.fetchMemes}>Load More</button>}
      </div>
    );
  }
}
export default NewApp;
