import React from "react";
import photosjson from "../photos.json";
//import ratsJson from "../rats.json";
import MobileWrapper from "./MobileWrapper";

class SpecialEnding extends React.Component {
  constructor(props) {
    super(props);
    this.text = [];
    this.offLimitRats = [props.finalRat];
    this.beginningRatPool = props.beginningRatPool;
    this.photos = [];
    // for (let i = 0; i < this.beginningRatPool.length; i++) {
    //   var f = this.getRatEndingFilename(this.beginningRatPool[i]);
    //   if (f !== undefined) {
    //     this.photos[this.photos.length] = f[0];
    //     this.text[this.text.length] = f[1];
    //   }
    // }
    var goodPhotos = this.getPhotos(props.finalRat);
    for (let i = 0; i < goodPhotos.length; i++) {
      this.photos[i] = goodPhotos[i].filename;
      this.text[i] = goodPhotos[i].text;
    }
    this.state = {
      opacity: 1,
      selectedRat: -1,
      selectedRats: [],
      selectRatsButton: <div id="chooseText">Others have found love too!</div>,
    };
  }
  random(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  //Grabs photos that will display with no duplicate rats
  getPhotos(activeRat) {
    //possible photos is the bank we can take photos from, it starts off as all photos
    let possiblePhotos = this.grabAllPhotos();

    //before you do anything, remove all photos that contain the rat you marries
    this.listCleanup(possiblePhotos, activeRat);

    //photos that end up being displayed
    let goodPhotos = [];

    //the numer of photos you're grabbing - I think we could change this to rand(4,6)
    //and then also reformat the epilog page so it centers the photos
    // 6: x x x   5: x x x    OR  x x     4: x x
    //    x x x       x x        x x x       x x

    let numPhotos = 6;

    //loops through num photos
    for (let i = 0; i < numPhotos; i++) {
      //grabs 'newPhoto' from possiblePhotos
      var newPhotoIndex = Math.floor(Math.random() * possiblePhotos.length);
      var newPhoto = possiblePhotos[newPhotoIndex];
      var newPhotoRats = newPhoto["rats"];

      //adds to our good photos list
      goodPhotos.push(newPhoto);

      //loops through rats in the new photo and cleans up possiblePhotos accordingly
      for (var j = 0; j < newPhotoRats.length; j++) {
        this.listCleanup(possiblePhotos, newPhotoRats[j]);
      }
    }

    //returns list of the photos that will be displayed
    return goodPhotos;
  }

  //makes a list of all photos in photosjson
  grabAllPhotos() {
    let allPhotos = [];

    for (const [key, value] of Object.entries(photosjson)) {
      let currentPhoto = { filename: key };

      for (const [key2, value2] of Object.entries(value)) {
        if (key2 === "rats") {
          currentPhoto[key2] = value2.split(",");
        } else {
          currentPhoto[key2] = value2;
        }
      }

      allPhotos.push(currentPhoto);
    }
    return allPhotos;
  }

  //removes all photos that contain a specific rat
  listCleanup(possiblePhotos, rat) {
    for (var i = possiblePhotos.length - 1; i >= 0; i--) {
      //Auction.auctions[i].seconds--;
      if (possiblePhotos[i]["rats"].includes(rat) === true) {
        possiblePhotos.splice(i, 1);
      }
    }
  }

  // Takes a string rat name and returns the Json object with additional details
  // getRatByName(name) {
  //   for (let i = 0; i < ratsJson.length; i++) {
  //     if (ratsJson[i].name === name) {
  //       return ratsJson[i].filename;
  //     }
  //   }
  // }
  // getRatEndingFilename(fullName) {
  //   //from beginning pool
  //   var name = this.getRatByName(fullName);
  //   var retVal;
  //   var retText;
  //   //var ti = this.text.length
  //   var corats = [];
  //   var noFileFound = false;
  //   for (let i = 0; i < photosRats.length; i++) {
  //     if (photosRats[i].rat === name) {
  //       var numEndings = photosRats[i].photos.length;

  //       var idx = Math.floor(Math.random() * numEndings);
  //       //var coRat = [this.offLimitRats[0]]
  //       // add this rat
  //       // just set it to something that will start the while loop
  //       var j = 0;
  //       var noViableEnding = true;
  //       // console.log(this.offLimitRats)
  //       while (noViableEnding) {
  //         retVal = photosRats[i].photos[idx].filename;
  //         retText = photosRats[i].photos[idx].text;

  //         corats = [];
  //         // console.log(retVal)
  //         switch (photosRats[i].photos[idx].numRats) {
  //           case 3:
  //             corats[corats.length] = photosRats[i].photos[idx].Rat1;
  //             noViableEnding =
  //               this.offLimitRats.indexOf(corats[corats.length - 1]) >= 0;
  //             corats[corats.length] = photosRats[i].photos[idx].Rat2;
  //             noViableEnding =
  //               noViableEnding ||
  //               this.offLimitRats.indexOf(corats[corats.length - 1]) >= 0;
  //             corats[corats.length] = photosRats[i].photos[idx].Rat3;
  //             // console.log("case3");
  //             noViableEnding =
  //               noViableEnding ||
  //               this.offLimitRats.indexOf(corats[corats.length - 1]) >= 0;
  //             // console.log("noViableEnding: " + noViableEnding)
  //             break;
  //           case 2:
  //             // console.log("case2")
  //             corats[corats.length] = photosRats[i].photos[idx].Rat1;
  //             noViableEnding =
  //               this.offLimitRats.indexOf(corats[corats.length - 1]) >= 0;
  //             corats[corats.length] = photosRats[i].photos[idx].Rat2;
  //             noViableEnding =
  //               noViableEnding ||
  //               this.offLimitRats.indexOf(corats[corats.length - 1]) >= 0;
  //             // console.log("noViableEnding: " + noViableEnding)
  //             break;

  //           case 1:
  //             // console.log("case1")
  //             corats[corats.length] = photosRats[i].photos[idx].Rat1;
  //             noViableEnding =
  //               this.offLimitRats.indexOf(corats[corats.length - 1]) >= 0;
  //             // console.log("noViableEnding: " + noViableEnding)
  //             break;
  //           default:
  //             //do nothing
  //             break;
  //         }
  //         // break while loop
  //         if (j > numEndings) {
  //           noViableEnding = false;
  //           noFileFound = true;
  //           // console.log()
  //         }
  //         idx = (idx + 1) % numEndings;

  //         // get the other rat involved
  //         j++;
  //       }
  //     }
  //   }
  //   if (noFileFound) {
  //     return undefined;
  //   }
  //   for (var i = 0; i < corats.length; i++) {
  //     this.offLimitRats[this.offLimitRats.length] = corats[i];
  //   }

  //   return [retVal, retText];
  // }
  // When a rat is clicked
  selectRat(id) {
    // Get the element for the current rat button
    if (this.selecctedID === id && this.selected === true) {
      this.deselect();
      return;
    }

    if (this.selecctedID !== null) {
      this.deselect();
    }

    const element = document.getElementById(id);
    if (element === null) {
      return;
    }
    element.classList.add("selectedRat");
    this.selecctedID = id;
    this.selected = true;
  }

  deselect() {
    const element = document.getElementById(this.selecctedID);
    this.selected = false;
    if (element === null) {
      return;
    }
    element.classList.remove("selectedRat");
  }
  render() {
    let ratsList = [
      <img
        key={"bgimg"}
        id="specialBg"
        onClick={this.deselect.bind(this)}
        src={`${process.env.PUBLIC_URL}/img/Photos/background.png`}
        alt="images on a table!"
      ></img>,
    ];
    const mobileTxt =
      this.state.selectedRat < 0
        ? "Tap on a photo to start."
        : this.text[this.state.selectedRat];
    // Create a clickable div for every rat in the game
    for (let i = 0; i < this.photos.length; i++) {
      if (this.text[i] === undefined) {
        continue;
      }
      ratsList.push(
        <div key={"ratslist" + i} id="ratContainer">
          <div id={`rat${i}`} className="ratListItem">
            <div
              className="ratPic"
              onClick={() => {
                if (this.props.isOnMobile) {
                  this.setState({ selectedRat: i });
                }
              }}
            >
              <img
                className={
                  i === this.state.selectedRat
                    ? "ratFrame selected"
                    : "ratFrame"
                }
                style={{
                  width: "100%",
                  paddingTop: this.props.isOnMobile
                    ? "0px"
                    : 30 * this.random(i - 991) + "px",
                  paddingRight: this.props.isOnMobile
                    ? "0px"
                    : 30 * this.random(i + 123) + "px",
                  transform: `rotate(${this.random(i + 22) * 30}deg) ${
                    !this.props.isOnMobile && "scale(2.24)"
                  }`,
                }}
                src={`${process.env.PUBLIC_URL}/img/Photos/${this.photos[i]}`}
                alt=""
              />
            </div>
            <div className="ratNameContainer">
              {!this.props.isOnMobile && (
                <div className="ratName">{`${this.text[i]}`}</div>
              )}
            </div>
          </div>
        </div>
      );
    }
    const buttons = (
      <div
        id="endingButtonContainer"
        key={"restartbutton"}
        style={{ paddingTop: 20 }}
      >
        <button
          id="followusButton"
          onClick={() => {
            window.open("https://www.instagram.com/alg0rat/?hl=en");
          }}
        >
          Follow for updates
        </button>
        <button
          id="payusButton"
          onClick={() => {
            window.open("https://ko-fi.com/alg0rat");
          }}
        >
          Donate if you enjoyed!
        </button>
        <button id="restartButton" onClick={this.props.restartGame}>
          Replay?
        </button>
      </div>
    );
    return (
      <>
        <div id="SpecialEndingScreen" className="screen">
          <div className="hide-overflow">
            <div id="ratListContainer">{ratsList}</div>
            {this.props.isOnMobile && (
              <div className="special-ending-description">{mobileTxt}</div>
            )}
          </div>
          {!this.props.isOnMobile && buttons}
        </div>
        {this.props.isOnMobile && <MobileWrapper>{buttons}</MobileWrapper>}
      </>
    );
  }
}

export default SpecialEnding;
