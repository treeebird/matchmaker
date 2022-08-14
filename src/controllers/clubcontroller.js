import Club from "../models/club.js"; 
import User from "../models/user.js";
import Court from "../models/courtBoard.js";

let enteredPlayer = [];
let upcommingGames = new Array();
let playClub = new Object();
export const getPlay = async (req, res) => {
    const { id } = req.params;
    playClub = await Club.findById(id);
    const existCourt = await Court.exists({clubID: playClub._id});
    console.log(existCourt);
    if(!existCourt){
        await Court.create({
            clubKoreanName: playClub.clubKoreanName,
            clubID: playClub._id,
            players: req.session.user,
        });      
        enteredPlayer.push(req.session.user);
        console.log("New court created!!");
    } else{
        console.log("There is no create");
    } 

        return res.render("playground", {pageTitle: "Board", playClub, enteredPlayer, upcommingGames});
}

export const postPlay = async (req, res) => {
    const { addPlayerName } = req.body;
    if(addPlayerName==""){
        return res.redirect(`/clubs/${playClub._id}/play`);

    }
    console.log(addPlayerName);
    const isExist = await User.exists({name: addPlayerName});
    if(!isExist){
        return res.render("playground", {pageTitle: "Board", playClub, enteredPlayer, upcommingGames, errorMasage: "일치하는 회원이름이 없습니다."})
    }
    const newPlayer = await User.findOne({name: addPlayerName});
    enteredPlayer.push(newPlayer);
    console.log(enteredPlayer);
    return res.redirect(`/clubs/${playClub._id}/play`);
}

export const clubHome = (req, res) => {
    return res.render("clubHome", {pageTitle: "Clubs"});
}

export const clubGetJoin = (req, res) => {
    return res.render("clubJoin");
}

export const clubPostJoin = async (req, res) => {

    const { clubKoreanName, clubEnglishName } = req.body;
    const sysop = req.session.user
    const pushClubs = sysop.clubs
    try {
        await Club.create({
        clubKoreanName,
        clubEnglishName,
        members: sysop._id,
        sysop: sysop._id,

        });



        console.log(pushClubs,"club print");
        const pushClubsAfter = pushClubs.push(clubKoreanName);
        console.log(pushClubs,"club print aftter push");
        const filter = { _id: sysop._id }
        const update = { clubs: pushClubs}
        await User.findOneAndUpdate(filter, update);
        console.log()

        
        return res.redirect("/");
    } catch (error) {
        return res.status(400).send("club create fail");
        };
}

export const postAddplayer = (req, res) => {
    const { addPlayer } = req.body;
    const objAddPlayer = JSON.parse(addPlayer);
    upcommingGames.push(objAddPlayer);
    console.log(upcommingGames);
    return res.redirect(`/clubs/${playClub._id}/play`);
}