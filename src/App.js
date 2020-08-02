import React from "react";
import FreeSound from "freesound-client";
import Waveform from "./Waveform";
import PlayList from "./Playlist";

const freeSound = new FreeSound();
freeSound.setToken("scxd6vqqUvfCieE3mGnrZbdBFRQc0DB4M7C5Jrbp");

class App extends React.Component {
  state = {
    sound: undefined,
    sounds: [],
    searchValue: "whale"
  };

  async componentDidMount() {
    this.search();
  }

  async handleItem(item) {
    const sound = await freeSound.getSound(item.id);
    const url = sound.previews["preview-lq-mp3"];
    this.setState({
      sound,
      url
    });
  }

  async search() {
    const { results: sounds } = await freeSound.textSearch(
      this.state.searchValue
    );
    this.setState({
      sounds
    });
  }

  setSearchValue(e) {
    this.setState({
      searchValue: e.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <input onChange={e => this.setSearchValue(e)} />
        <button onClick={() => this.search()}>Search</button>
        {this.state.url && <Waveform url={this.state.url} />}
        <h1>{this.state.sound?.name}</h1>
        <h1>{this.state.sound?.description}</h1>
        {this.state.sound?.tags.join(", ")}
        <PlayList
          tracks={this.state.sounds}
          selectedTrack={this.state.sound?.id || this.state.sounds[0]?.id || 0}
          setSelectedTrack={track => this.handleItem(track)}
        />
      </div>
    );
  }
}

export default App;
