export interface Match {
	metadata: MetadataDto;
	info: InfoDto;
}

export interface MetadataDto {
	dataVersion: string;
	matchId: string;
	participants: string[];
}

export interface InfoDto {
	endOfGameResult: string;
	gameCreation: number;
	gameDuration: number;
	gameEndTimestamp: number;
	gameId: number;
	gameMode: string;
	gameName: string;
	gameStartTimestamp: number;
	gameType: string;
	gameVersion: string;
	mapId: number;
	participants: ParticipantDto[];
	platformId: string;
	queueId: number;
	teams: TeamDto[];
	tournamentCode: string;
}

export interface ParticipantDto {
	allInPings: number;
	assistMePings: number;
	assists: number;
	baronKills: number;
	bountyLevel: number;
	champExperience: number;
	champLevel: number;
	championId: number;
	championName: string;
	commandPings: number;
	championTransform: number;
	consumablesPurchased: number;
	damageDealtToBuildings: number;
	damageDealtToObjectives: number;
	damageDealtToTurrets: number;
	damageSelfMitigated: number;
	deaths: number;
	detectorWardsPlaced: number;
	doubleKills: number;
	dragonKills: number;
	eligibleForProgression: boolean;
	enemyMissingPings: number;
	enemyVisionPings: number;
	firstBloodAssist: boolean;
	firstBloodKill: boolean;
	firstTowerAssist: boolean;
	firstTowerKill: boolean;
	gameEndedInEarlySurrender: boolean;
	gameEndedInSurrender: boolean;
	getBackPings: number;
	goldEarned: number;
	goldSpent: number;
	holdPings: number;
	individualPosition: string;
	inhibitorKills: number;
	inhibitorTakedowns: number;
	inhibitorsLost: number;
	item0: number;
	item1: number;
	item2: number;
	item3: number;
	item4: number;
	item5: number;
	item6: number;
	itemsPurchased: number;
	killingSprees: number;
	kills: number;
	lane: string;
	largestCriticalStrike: number;
	largestKillingSpree: number;
	largestMultiKill: number;
	longestTimeSpentLiving: number;
	magicDamageDealt: number;
	magicDamageDealtToChampions: number;
	magicDamageTaken: number;
	missions: MissionsDto;
	neutralMinionsKilled: number;
	needVisionPings: number;
	nexusKills: number;
	nexusTakedowns: number;
	nexusLost: number;
	objectivesStolen: number;
	objectivesStolenAssists: number;
	onMyWayPings: number;
	participantId: number;
	pentaKills: number;
	perks: PerksDto;
	physicalDamageDealt: number;
	physicalDamageDealtToChampions: number;
	physicalDamageTaken: number;
	profileIcon: number;
	pushPings: number;
	puuid: string;
	quadraKills: number;
	riotIdGameName: string;
	riotIdTagline: string;
	role: string;
	sightWardsBoughtInGame: number;
	spell1Casts: number;
	spell2Casts: number;
	spell3Casts: number;
	spell4Casts: number;
	summoner1Casts: number;
	summoner1Id: number;
	summoner2Casts: number;
	summoner2Id: number;
	summonerId: string;
	summonerLevel: number;
	summonerName: string;
	teamEarlySurrendered: boolean;
	teamId: number;
	teamPosition: string;
	timeCCingOthers: number;
	timePlayed: number;
	totalDamageDealt: number;
	totalDamageDealtToChampions: number;
	totalDamageShieldedOnTeammates: number;
	totalDamageTaken: number;
	totalHeal: number;
	totalHealsOnTeammates: number;
	totalMinionsKilled: number;
	totalTimeCCDealt: number;
	totalTimeSpentDead: number;
	totalUnitsHealed: number;
	tripleKills: number;
	trueDamageDealt: number;
	trueDamageDealtToChampions: number;
	trueDamageTaken: number;
	turretKills: number;
	turretTakedowns: number;
	turretsLost: number;
	unrealKills: number;
	visionScore: number;
	visionClearedPings: number;
	visionWardsBoughtInGame: number;
	wardsKilled: number;
	wardsPlaced: number;
	win: boolean;
	challenges: ChallengesDto;
}

export interface ChallengesDto {
	twelveAssistStreakCount: number;
	abilityUses: number;
	acesBefore15Minutes: number;
	alliedJungleMonsterKills: number;
	baronTakedowns: number;
	blastConeOppositeOpponentCount: number;
	bountyGold: number;
	buffsStolen: number;
	completeSupportQuestInTime: number;
	controlWardsPlaced: number;
	damagePerMinute: number;
	damageTakenOnTeamPercentage: number;
	dancedWithRiftHerald: number;
	deathsByEnemyChamps: number;
	dodgeSkillShotsSmallWindow: number;
	doubleAces: number;
	dragonTakedowns: number;
	earliestBaron: number;
	earliestDragonTakedown: number;
	earliestElderDragon: number;
	earlyLaningPhaseGoldExpAdvantage: number;
	effectiveHealAndShielding: number;
	elderDragonKillsWithOpposingSoul: number;
	elderDragonMultikills: number;
	enemyChampionImmobilizations: number;
	enemyJungleMonsterKills: number;
	epicMonsterKillsNearEnemyJungler: number;
	epicMonsterKillsWithin30SecondsOfSpawn: number;
	epicMonsterSteals: number;
	epicMonsterStolenWithoutSmite: number;
	flawlessAces: number;
	fullTeamTakedown: number;
	gameLength: number;
	getTakedownsInAllLanesEarlyJungleAsLaner: number;
	goldPerMinute: number;
	hadAfkTeammate: number;
	hadOpenNexus: number;
	highestCrowdControlScore: number;
	immobilizeAndKillWithAlly: number;
	initialBuffCount: number;
	initialCrabCount: number;
	jungleCsBefore10Minutes: number;
	junglerKillsEarlyJungle: number;
	junglerTakedownsNearDamagedEpicMonster: number;
	kTurretsDestroyedBeforePlatesFall: number;
	kda: number;
	killAfterHiddenWithAlly: number;
	killParticipation: number;
	killedChampTookFullTeamDamageSurvived: number;
	killsNearEnemyTurret: number;
	killsOnOtherLanesEarlyJungleAsLaner: number;
	killsOnRecentlyHealedByAramPack: number;
	killsUnderOwnTurret: number;
	killsWithHelpFromEpicMonster: number;
	knockEnemyIntoTeamAndKill: number;
	landSkillShotsEarlyGame: number;
	laneMinionsFirst10Minutes: number;
	laningPhaseGoldExpAdvantage: number;
	legendaryCount: number;
	lostAnInhibitor: number;
	maxCsAdvantageOnLaneOpponent: number;
	maxKillDeficit: number;
	maxLevelLeadLaneOpponent: number;
	mejaisFullStackInTime: number;
	moreEnemyJungleThanOpponent: number;
	multiKillOneSpell: number;
	multiTurretRiftHeraldCount: number;
	multikills: number;
	multikillsAfterAggressiveFlash: number;
	mythicItemUsed: number;
	outerTurretExecutesBefore10Minutes: number;
	outnumberedKills: number;
	outnumberedNexusKill: number;
	perfectDragonSoulsTaken: number;
	perfectGame: number;
	pickKillWithAlly: number;
	playedChampSelectPosition: number;
	poroExplosions: number;
	quickCleanse: number;
	quickFirstTurret: number;
	quickSoloKills: number;
	riftHeraldTakedowns: number;
	saveAllyFromDeath: number;
	scuttleCrabKills: number;
	skillshotsDodged: number;
	skillshotsHit: number;
	snowballsHit: number;
	soloBaronKills: number;
	soloKills: number;
	stealthWardsPlaced: number;
	survivedSingleDigitHpCount: number;
	survivedThreeImmobilizesInFight: number;
	takedownOnFirstTurret: number;
	takedowns: number;
	takedownsAfterGainingLevelAdvantage: number;
	takedownsBeforeJungleMinionSpawn: number;
	takedownsFirstXMinutes: number;
	takedownsInAlcove: number;
	takedownsInEnemyFountain: number;
	teamBaronKills: number;
	teamDamagePercentage: number;
	teamElderDragonKills: number;
	teamRiftHeraldKills: number;
	threeWardsOneSweeperCount: number;
	tookLargeDamageSurvived: number;
	turretPlatesTaken: number;
	turretTakedowns: number;
	turretsTakenWithRiftHerald: number;
	twentyMinionsIn3SecondsCount: number;
	twoWardsOneSweeperCount: number;
	unseenRecalls: number;
	visionScoreAdvantageLaneOpponent: number;
	visionScorePerMinute: number;
	wardTakedowns: number;
	wardTakedownsBefore20M: number;
	wardsGuarded: number;
	// SWARM specific challenges
	SWARM_DefeatAatrox: number;
	SWARM_DefeatBriar: number;
	SWARM_DefeatMiniBosses: number;
	SWARM_EvolveWeapon: number;
	SWARM_Have3Passives: number;
	SWARM_KillEnemy: number;
	SWARM_PickupGold: number;
	SWARM_ReachLevel50: number;
	SWARM_Survive15Min: number;
}
export interface PerksDto {
	statPerks: PerkStatsDto;
	styles: PerkStyleDto[];
}

export interface PerkStatsDto {
	defense: number;
	flex: number;
	offense: number;
}

export interface PerkStyleDto {
	description: string;
	selections: PerkStyleSelectionDto[];
	style: number;
}

export interface PerkStyleSelectionDto {
	perk: number;
	var1: number;
	var2: number;
	var3: number;
}

export interface TeamDto {
	bans: BanDto[];
	objectives: ObjectivesDto;
	teamId: number;
	win: boolean;
}

export interface BanDto {
	championId: number;
	pickTurn: number;
}

export interface ObjectivesDto {
	baron: ObjectiveDto;
	champion: ObjectiveDto;
	dragon: ObjectiveDto;
	horde: ObjectiveDto;
	inhibitor: ObjectiveDto;
	riftHerald: ObjectiveDto;
	tower: ObjectiveDto;
}

export interface ObjectiveDto {
	first: boolean;
	kills: number;
}

export interface MissionsDto {
	playerScore0: number;
	playerScore1: number;
	playerScore2: number;
	playerScore3: number;
	playerScore4: number;
	playerScore5: number;
	playerScore6: number;
	playerScore7: number;
	playerScore8: number;
	playerScore9: number;
	playerScore10: number;
	playerScore11: number;
}
