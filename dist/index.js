"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const generalLog = (0, debug_1.default)("app:general");
const CitizensTalk = (0, debug_1.default)("app:CitizensTalking");
const GodLog = (0, debug_1.default)("app:God :");
const TargetLog = (0, debug_1.default)("app:Target :");
const ResultVoting = (0, debug_1.default)("app:Result vote :");
const Treatmentlog = (0, debug_1.default)("app:Treatment:");
const speed = 300;
class Person {
    constructor(name) {
        this.name = "";
        this.targetcounter = 0;
        this.roles = "Citizen";
        this.name = name;
        this.log = (0, debug_1.default)(`app:Person:${this.name}`);
        this.roles = "Citizen";
    }
    target(toWho) {
        return __awaiter(this, void 0, void 0, function* () {
            toWho.targetSum(toWho);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, Math.random() * speed);
            });
        });
    }
    targetSum(fromWho) {
        this.targetcounter++;
    }
}
function restTargetcounter(Citizens) {
    Citizens.forEach((item) => {
        item.targetcounter = 0;
    });
}
function CitizensTarget(Citizens) {
    Citizens.forEach((item) => {
        do {
            var indexrnd = Math.floor(Math.random() * Citizens.length);
            var target = Citizens[indexrnd];
            if (item.roles == "Mafia") {
                var CitizensExceptMafia = [];
                Citizens.forEach((item) => {
                    if (item.roles != "Mafia") {
                        CitizensExceptMafia.push(item);
                    }
                });
                var indexrnd = Math.floor(Math.random() * CitizensExceptMafia.length);
                var target = CitizensExceptMafia[indexrnd];
            }
        } while (item == Citizens[indexrnd]);
        item.target(target);
        TargetLog(`${item.name} Target to ${target.name} with actual role ${target.roles}`);
        sleep(3000);
    });
}
function showResultOfVoting(Citizens) {
    GodLog("End of voting. Result is :");
    Citizens.forEach((item) => {
        GodLog(`${item.name} Number of votes:  ${item.targetcounter} with actual role ${item.roles}`);
        sleep(1000);
    });
}
function ExitcandidatesAndpop(Citizens) {
    ResultVoting("End of voting. Result is :");
    var maxtarget = 0;
    var compelexExitcandidates = [];
    Citizens.forEach((item) => {
        if (item.targetcounter > maxtarget) {
            maxtarget = item.targetcounter;
            compelexExitcandidates = [];
            compelexExitcandidates.push(item);
        }
        else if (item.targetcounter == maxtarget && maxtarget != 0) {
            compelexExitcandidates.push(item);
        }
    });
    compelexExitcandidates.forEach((item) => {
        ResultVoting(`${item.name} Number of votes is:  ${item.targetcounter} with actual role ${item.roles} is condidates for exit`);
        sleep(2000);
    });
    if (compelexExitcandidates.length == 1) {
        GodLog(`${compelexExitcandidates[0].name} exited from the Game`);
        Citizens.splice((Citizens.indexOf(compelexExitcandidates[0])), 1);
    }
    else if (compelexExitcandidates.length > 1) {
        let indexrandom = Math.floor(Math.random() * compelexExitcandidates.length);
        Citizens.splice((Citizens.indexOf(compelexExitcandidates[indexrandom])), 1);
        GodLog('Exit Condidate is more than 1 then There must be a lottery');
        sleep(2000);
        GodLog(`${compelexExitcandidates[indexrandom].name} exited from the Game`);
    }
    GodLog(`Remaining the Person in the Game is:  ${Citizens.length} Person`);
    sleep(2000);
}
function distributes_roles(Citizens) {
    var roles_complex = ["Citizen", "Citizen", "Citizen", "Citizen", "Citizen", "Citizen", "Citizen", "Citizen", "Mafia", "Mafia"];
    Citizens.forEach((item) => {
        let indexRandom = Math.floor(Math.random() * roles_complex.length);
        item.roles = roles_complex.splice(indexRandom, 1).join();
    });
}
function sleep(sleepTime) {
    (function () {
        var now = new Date().getTime();
        while (new Date().getTime() < now + sleepTime)
            ;
    })();
}
function randomTalking(Citizens) {
    var SentenceComplex = [`I consider player ${(1 + Math.floor(Math.random() * Citizens.length))} & ${(1 + Math.floor(Math.random() * Citizens.length))} to be Mafia`,
        `Players ${(1 + Math.floor(Math.random() * Citizens.length))} & ${(1 + Math.floor(Math.random() * Citizens.length))} are suspicious to me`,
        `I believe players ${(1 + Math.floor(Math.random() * Citizens.length))} & ${(1 + Math.floor(Math.random() * Citizens.length))} are Black`,
        `I think player ${(1 + Math.floor(Math.random() * Citizens.length))} is nervous. His body language suggests he is Black`,
        `Player ${(1 + Math.floor(Math.random() * Citizens.length))} is against ${(1 + Math.floor(Math.random() * Citizens.length))}, so he might be a citizen`,
        `Accordingly, I nominate player number ${(1 + Math.floor(Math.random() * Citizens.length))}. Let us vote him off`,
        `I am the real Sheriff of the game`,
        `On the first night I checked player ${(1 + Math.floor(Math.random() * Citizens.length))} — he is black. Second night I checked player ${(1 + Math.floor(Math.random() * Citizens.length))} — he is red.`,
        `I nominate player number ${(1 + Math.floor(Math.random() * Citizens.length))}. Citizens, please let us vote together against player ${(1 + Math.floor(Math.random() * Citizens.length))}, because he is definitely Mafia`,
        'Dear citizens, you made a mistake, because I was citizen'];
    return SentenceComplex;
}
function CitizensTalking(Citizens) {
    Citizens.forEach((item) => {
        // setTimeout(() => {
        let SentenceComplex = randomTalking(Citizens);
        CitizensTalk(`${item.name} with Roles ${item.roles}  : ${SentenceComplex[Math.floor(Math.random() * SentenceComplex.length)]}`);
        // console.log(" ")
        // }, 2000);
        sleep(3000);
    });
    GodLog("End of discussion. Start voting...");
    sleep(2000);
}
function executedistributes() {
    GodLog("The roles were secretly distributed among the citizens");
    sleep(2000);
}
function executenewday() {
    GodLog("A new day has begun. ");
    sleep(1500);
    GodLog("Citizens argue to find the Mafia");
    sleep(1500);
}
function TheNightHasArrived() {
    GodLog("The night has arrived. Everyone should sleep");
    sleep(1500);
}
function Mafiashooting(Citizens) {
    GodLog("Mafia wake up");
    sleep(1500);
    GodLog("and Shoot one of the citizens");
    var CitizensExceptMafia = [];
    Citizens.forEach((item) => {
        if (item.roles != "Mafia") {
            CitizensExceptMafia.push(item);
        }
    });
    var Citizenkilled = CitizensExceptMafia[Math.floor(Math.random() * CitizensExceptMafia.length)];
    sleep(2000);
    TargetLog(`Mafia shot at ${Citizenkilled.name}`);
    sleep(2000);
    GodLog("Mafia Sleep & Doctor wake up");
    GodLog("The doctor will save someone");
    var Treatment = Citizens[Math.floor(Math.random() * Citizens.length)];
    Treatmentlog(`The doctor gives ${Treatment.name} life again`);
    sleep(2000);
    if (Citizenkilled != Treatment) {
        GodLog(`The doctor made a mistake and the ${Citizenkilled.name} died.`);
        Citizens.splice((Citizens.indexOf(Citizenkilled)), 1);
    }
    else {
        GodLog(`The doctor save ${Citizenkilled.name}`);
    }
    sleep(1500);
}
function GameIsContinue(Citizens, flag) {
    var mafiaCounter = 0;
    var CitizenCounter = 0;
    Citizens.forEach((item) => {
        if (item.roles == "Mafia") {
            mafiaCounter++;
        }
        else if (item.roles == "Citizen") {
            CitizenCounter++;
        }
    });
    if (mafiaCounter == CitizenCounter || mafiaCounter > CitizenCounter) {
        GodLog(`Game is finished & The Mafia wins remainig Citizen: ${mafiaCounter} remainig Citizen ${CitizenCounter}`);
        flag[0] = false;
    }
    else if (mafiaCounter == 0) {
        GodLog(`Game is finished & The Citizen wins remainig Mafia: ${mafiaCounter} remainig Citizen: ${CitizenCounter}`);
        flag[0] = false;
    }
    else if (mafiaCounter < CitizenCounter && mafiaCounter != 0) {
        GodLog(`The Game is continue ... remainig Mafia: ${mafiaCounter} remainig Citizen: ${CitizenCounter}`);
        flag[0] = true;
    }
}
function startMafiaGame(timeout = 3) {
    return __awaiter(this, void 0, void 0, function* () {
        generalLog("MafiaGame is going to be started... ");
        const interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            generalLog(`In ${timeout--}`);
            if (timeout < 0) {
                clearInterval(interval);
                generalLog("Started !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ");
                const Citizen1 = new Person("Citizen1");
                const Citizen2 = new Person("Citizen2");
                const Citizen3 = new Person("Citizen3");
                const Citizen4 = new Person("Citizen4");
                const Citizen5 = new Person("Citizen5");
                const Citizen6 = new Person("Citizen6");
                const Citizen7 = new Person("Citizen7");
                const Citizen8 = new Person("Citizen8");
                const Citizen9 = new Person("Citizen9");
                const Citizen10 = new Person("Citizen10");
                executedistributes();
                var Citizens = [Citizen1, Citizen2, Citizen3, Citizen4, Citizen5, Citizen6, Citizen7, Citizen8, Citizen9, Citizen10];
                distributes_roles(Citizens);
                var flag = [true];
                // while (flag[0]) {
                while (flag[0]) {
                    executenewday();
                    CitizensTalking(Citizens);
                    restTargetcounter(Citizens);
                    CitizensTarget(Citizens);
                    showResultOfVoting(Citizens);
                    ExitcandidatesAndpop(Citizens);
                    TheNightHasArrived();
                    Mafiashooting(Citizens);
                    GameIsContinue(Citizens, flag);
                }
                // }
            }
        }), 2000);
    });
}
startMafiaGame();
