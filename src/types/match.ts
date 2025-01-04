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
	gameName: string;
	gameStartTimestamp: number;
	gameType: string;
	gameVersion: string;
	mapId: number;
	participants: ParticipantDto[];
	platformId: string;
	teams: TeamDto[];
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
	doubleKills: number;
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
	blastConeOppositeOpponentCount: number;
	bountyGold: number;
	controlWardsPlaced: number;
	damagePerMinute: number;
	damageTakenOnTeamPercentage: number;
	deathsByEnemyChamps: number;
	dodgeSkillShotsSmallWindow: number;
	doubleAces: number;
	effectiveHealAndShielding: number;
	enemyChampionImmobilizations: number;
	flawlessAces: number;
	fullTeamTakedown: number;
	gameLength: number;
	goldPerMinute: number;
	hadAfkTeammate: number;
	hadOpenNexus: number;
	highestCrowdControlScore: number;
	immobilizeAndKillWithAlly: number;
	kTurretsDestroyedBeforePlatesFall: number;
	kda: number;
	killAfterHiddenWithAlly: number;
	killParticipation: number;
	killedChampTookFullTeamDamageSurvived: number;
	killsNearEnemyTurret: number;
	killsOnRecentlyHealedByAramPack: number;
	killsUnderOwnTurret: number;
	killsWithHelpFromEpicMonster: number;
	knockEnemyIntoTeamAndKill: number;
	landSkillShotsEarlyGame: number;
	laneMinionsFirst10Minutes: number;
	laningPhaseGoldExpAdvantage: number;
	legendaryCount: number;
	lostAnInhibitor: number;
	maxKillDeficit: number;
	multiKillOneSpell: number;
	multikills: number;
	multikillsAfterAggressiveFlash: number;
	outerTurretExecutesBefore10Minutes: number;
	outnumberedKills: number;
	outnumberedNexusKill: number;
	perfectGame: number;
	pickKillWithAlly: number;
	playedChampSelectPosition: number;
	poroExplosions: number;
	quickCleanse: number;
	quickFirstTurret: number;
	quickSoloKills: number;
	saveAllyFromDeath: number;
	skillshotsDodged: number;
	skillshotsHit: number;
	snowballsHit: number;
	soloKills: number;
	survivedSingleDigitHpCount: number;
	survivedThreeImmobilizesInFight: number;
	takedownOnFirstTurret: number;
	takedowns: number;
	takedownsAfterGainingLevelAdvantage: number;
	takedownsFirstXMinutes: number;
	teamDamagePercentage: number;
	threeWardsOneSweeperCount: number;
	tookLargeDamageSurvived: number;
	turretPlatesTaken: number;
	turretTakedowns: number;
	twentyMinionsIn3SecondsCount: number;
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
	objectives: ObjectivesDto;
	teamId: number;
	win: boolean;
}

export interface ObjectivesDto {
	champion: ObjectiveDto;
	tower: ObjectiveDto;
}

export interface ObjectiveDto {
	first: boolean;
	kills: number;
}
