import 'react-native';
import React from 'react';
import RestoreCredentials from '../../components/restore_credentials/restore_credentials';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <RestoreCredentials />
    );
});
