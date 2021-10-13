import { delay } from '../common/util/utils';
import { sampleData } from './sampleData';

export function fetchSampleData() {
	return delay(1000).then(() => {
		return Promise.resolve(sampleData);
	});
}
