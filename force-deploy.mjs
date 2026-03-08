import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

// Force a new deployment by updating package.json version
function forceDeploy() {
  try {
    console.log('🚀 Forcing new deployment...');
    
    // Read current package.json
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageData = JSON.parse(readFileSync(packagePath, 'utf8'));
    
    // Update version with timestamp to force new build
    const timestamp = new Date().getTime();
    packageData.version = `1.0.${timestamp}`;
    
    // Write back to package.json
    writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
    
    console.log('✅ Package version updated to:', packageData.version);
    console.log('📝 Next steps:');
    console.log('1. Commit and push this change');
    console.log('2. This will trigger Cloudflare Pages to rebuild with fresh cache');
    console.log('3. Check Cloudflare dashboard for build status');
    
  } catch (error) {
    console.error('❌ Error forcing deployment:', error.message);
  }
}

forceDeploy();
