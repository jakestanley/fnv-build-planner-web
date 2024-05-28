import { parseCSV, sortPerks, getPerkRequirements } from "../functions";

describe('parseCSV', () => {
    const lines = 
`Perk,Gender,Level,Strength,Perception,Endurance,Charisma,Intelligence,Agility,Luck,Barter,Energy Weapons,Explosives,Guns,Lockpick,Medicine,Melee Weapons,Repair,Science,Sneak,Speech,Survival,Unarmed,Description
Retention,,2,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,Skill magazine bonuses last three times as long.
"Heave, Ho!",,2,5,0,0,0,0,0,0,0,0,30,0,0,0,0,0,0,0,0,0,0,Throw weapons 30% further.
Cannibal,,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,Eat a corpse to regain Health.`
    it('should parse perks from a CSV string correctly', async () => {
        const actual = await parseCSV(lines);
        expect(actual).toHaveLength(3);
        
        expect(actual[0]).toEqual({
            Perk: 'Retention',
            Gender: '',
            Level: '2',
            Strength: '0',
            Perception: '0',
            Endurance: '0',
            Charisma: '0',
            Intelligence: '5',
            Agility: '0',
            Luck: '0',
            Barter: '0',
            "Energy Weapons": '0',
            Explosives: '0',
            Guns: '0',
            Lockpick: '0',
            Medicine: '0',
            "Melee Weapons": '0',
            Repair: '0',
            Science: '0',
            Sneak: '0',
            Speech: '0',
            Survival: '0',
            Unarmed: '0',
            Description: 'Skill magazine bonuses last three times as long.'
        })

        expect(actual[1]).toEqual({
            Perk: 'Heave, Ho!',
            Gender: '',
            Level: '2',
            Strength: '5',
            Perception: '0',
            Endurance: '0',
            Charisma: '0',
            Intelligence: '0',
            Agility: '0',
            Luck: '0',
            Barter: '0',
            'Energy Weapons': '0',
            Explosives: '30',
            Guns: '0',
            Lockpick: '0',
            Medicine: '0',
            "Melee Weapons": '0',
            Repair: '0',
            Science: '0',
            Sneak: '0',
            Speech: '0',
            Survival: '0',
            Unarmed: '0',
            Description: 'Throw weapons 30% further.'
        })
    })
});

describe('sortPerks', () => {
    it('should sort perks by level', () => {
        const perks = [
            {
                Perk: 'Retention',
                Level: '3'
            },
            {
                Perk: 'Intense Training',
                Level: '0'
            },
            {
                Perk: 'Heave, Ho!',
                Level: '2'
            }
        ];

        sortPerks(perks);

        expect(perks[0].Perk).toEqual('Intense Training');
        expect(perks[1].Perk).toEqual('Heave, Ho!');
        expect(perks[2].Perk).toEqual('Retention');
    })
})

describe('getPerkRequirements', () => {
    it('should return a string representation of all non-zero requirements', () => {
        const perk = {
            Perk: 'Retention',
            Strength: '1',
            Intelligence: '2',
            Luck: '3',
            Charisma: '0',
            Perception: '0',
            Gender: 'Male'
        }

        const result = getPerkRequirements(perk);
        expect(result).toEqual('Strength: 1<br>Intelligence: 2<br>Luck: 3<br>Gender: Male');
    })
})