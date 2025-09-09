import axios from 'axios';
import { myCollection } from '../db/my_collection/index.js';
import fs from 'fs';
import { exec } from 'child_process';

let allRecs;
//let commanderName = "tatsunari-toad-rider";
let txtOutput = [];
let apiResponse;

async function getCommanderInfo(commanderName) {
    const response = await axios.get(`https://json.edhrec.com/pages/commanders/${commanderName}.json`);
    allRecs = response.data.container.json_dict.cardlists;
};

function generateTxtOutput(categoriesList) {
    categoriesList.forEach(category => {
        txtOutput.push(`\n ---------------------------- ${category.header} ----------------------------\n`);
        category.cardsList.forEach(card => {
            txtOutput.push(`${card.name}\n`)
            txtOutput.push(`Decks em que aparece: ${card.num_decks} (${card.label.split('\n')[0].replace('of', 'de')})\n`)
        });
    });
    txtOutput = txtOutput.join("\n");
    fs.writeFileSync('./txtOutput.txt', txtOutput, 'utf-8');
};

function compareWithMyCollection(allRecs, myCollection) {
    let recsInMyCollection = [];
    allRecs.map(category => {
        let categoryObject = {
            header: category.header,
            cardsList: []
        };
        category.cardviews.forEach(card => {
            if (myCollection.includes(card.name)) {
                categoryObject.cardsList.push(card);
            };
        });
        recsInMyCollection.push(categoryObject);
    });

    let refinedList = [];
    recsInMyCollection.forEach(category => {
        if (category.cardsList.length > 0) {
            refinedList.push(category);
        };
    })

    apiResponse = refinedList;
    generateTxtOutput(refinedList);
};

function openOutput() {
    exec(`start "" "txtOutput.txt"`);
}

async function generateRecs(req, res) {
    const { commanderName } = req.params;
    await getCommanderInfo(commanderName);
    compareWithMyCollection(allRecs, myCollection);
    openOutput();
    res.status(200).send(apiResponse)
};

export { generateRecs }