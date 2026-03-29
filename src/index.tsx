import {Composition} from 'remotion';
import {DefaultExe} from './DefaultExe';

export const RemotionRoot: React.FC = () => {
	return (
		<Composition
			id="DEFAULT_EXE"
			component={DefaultExe}
			durationInFrames={5400}
			fps={30}
			width={1920}
			height={1080}
		/>
	);
};
