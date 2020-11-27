import { gql } from "@apollo/client";
export const FETCH_SKILLS = gql`
	query returnUserData($userId: String!) {
		returnUserData(userId: $userId) {
			id
			skills {
				id
				title
				categories
				progress
				createdAt
				missions {
					id
					title
					lastStartedAt
					createdAt
					startedAt
					finishedAt
					pausedAt
					isStarted
					isFinished
					isPaused
					timeSpent
					description
					log {
						createdAt
						description
					}
				}
				challenges {
					id
					title
				}
			}
		}
	}
`;
