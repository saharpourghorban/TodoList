import useStore from '../Store/useStore';

const useLocalData = () => {
	const { selector } = useStore();
	return selector(s => s.localData);
};

export default useLocalData;
