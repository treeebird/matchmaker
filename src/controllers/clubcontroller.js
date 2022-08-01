import Club from "../models/club"; 
import User from "../models/user";
import Court from "../models/courtBoard";
export const getPlay = async (req, res) => {
    const { id } = req.params;
    const playClub = await Club.findById(id);
    const existCourt = await Court.exists({clubID: playClub._id});
    console.log(existCourt);
    if(!existCourt){
        await Court.create({
            clubKoreanName: playClub.clubKoreanName,
            clubID: playClub._id,
            players: req.session.user,
        });      
        console.log("New court created!!");
    } else{
        console.log("There is no create");
    } 
        const playerList = await Court.findOne({clubKoreanName: playClub.clubKoreanName});
        console.log(playerList)
        return res.render("playground", {pageTitle: "Board", playClub, playerList});
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